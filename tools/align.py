#!/usr/bin/env python3
"""Align a Malayalam voice script to its audio, line by line, without speech recognition.

How: find speech chunks (pauses >= 0.25 s) and syllable beats in the audio, count syllables
(aksharas) in each script phrase, then use dynamic programming to map consecutive phrases
onto consecutive chunks so the syllable counts agree. This fixed the sync problems we had
with plain silence matching.

Usage: python3 tools/align.py audio.wav phrases.txt > timeline.json
  phrases.txt: one phrase per line, in spoken order. Split long sentences at '...', ',' and
  '.' so each line is short. Write numbers as words the voice says (5000 -> അയ്യായിരം),
  and read the title as it is spoken (– പാർട്ട് 1 -> പാർട്ട് വൺ).
Output: JSON list of {start, end, phrases:[...]} plus a printed table on stderr.
Check: the printed a/t columns (audio vs text syllables) should rise and fall together.
"""
import json, sys, wave
import numpy as np

def load(path):
    w = wave.open(path); sr = w.getframerate(); n = w.getnframes(); ch = w.getnchannels()
    x = np.frombuffer(w.readframes(n), dtype=np.int16).astype(float) / 32768
    if ch > 1: x = x.reshape(-1, ch).mean(1)
    return x, sr

def chunks_and_beats(x, sr):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / sr); X[(f < 300) | (f > 3000)] = 0
    y = np.fft.irfft(X, len(x)); hop = int(.01 * sr)
    env = np.array([np.sqrt((y[i:i + hop] ** 2).mean()) for i in range(0, len(y) - hop, hop)])
    k = np.hanning(9); k /= k.sum(); env = np.convolve(env, k, "same")
    db = 20 * np.log10(env + 1e-6); floor = np.percentile(db, 20)
    beats = []; last = -99
    for i in range(2, len(env) - 2):
        if env[i] >= env[i - 1] and env[i] > env[i + 1] and db[i] > floor + 18:
            lo = min(env[max(0, i - 8):i].min(), env[i + 1:i + 9].min())
            if env[i] > lo * 1.35 and i - last >= 9: beats.append(i * .01); last = i
    sil = db < floor + 8; segs = []; inseg = False; st = 0; run = 0
    for i, s in enumerate(sil):
        if not s:
            if not inseg: st = i; inseg = True
            run = 0
        elif inseg:
            run += 1
            if run >= 25: segs.append((st * .01, (i - run + 1) * .01)); inseg = False; run = 0
    if inseg: segs.append((st * .01, len(sil) * .01))
    return [(a, b) for a, b in segs if b - a > .12], np.array(beats)

def syllables(t):
    n = 0
    for i, c in enumerate(t):
        o = ord(c)
        if 0xD05 <= o <= 0xD14: n += 1
        elif 0xD15 <= o <= 0xD39 and (t[i + 1] if i + 1 < len(t) else "") != "്": n += 1
        elif c.isascii() and c.isalpha(): n += 0.4          # stray English letters
    return max(1, round(n))

def align(segs, beats, phrases):
    ts = [syllables(p) for p in phrases]
    sa = [int(((beats >= a) & (beats < b)).sum()) for a, b in segs]
    n, m = len(phrases), len(segs); INF = 1e18; best = None
    for r in np.arange(.5, 1.3, .02):
        dp = np.full((n + 1, m + 1), INF); bk = {}; dp[0][0] = 0
        for i in range(n + 1):
            for j in range(m + 1):
                if dp[i][j] >= INF: continue
                for k in range(1, 5):
                    for l in range(1, 4):
                        if i + k > n or j + l > m: continue
                        T = sum(ts[i:i + k]) * r; S = sum(sa[j:j + l])
                        c = dp[i][j] + (S - T) ** 2 / (T + 3) + 1.5 * (l - 1) + .3 * (k - 1)
                        if c < dp[i + k][j + l]: dp[i + k][j + l] = c; bk[(i + k, j + l)] = (i, j)
        if best is None or dp[n][m] < best[0]: best = (dp[n][m], r, bk)
    _, r, bk = best; i, j = n, m; out = []
    while (i, j) != (0, 0):
        pi, pj = bk[(i, j)]
        out.append({"start": round(segs[pj][0], 2), "end": round(segs[j - 1][1], 2),
                    "phrases": phrases[pi:i], "audio_syl": sum(sa[pj:j]), "text_syl": sum(ts[pi:i])})
        i, j = pi, pj
    return list(reversed(out)), r

if __name__ == "__main__":
    x, sr = load(sys.argv[1])
    phrases = [l.strip() for l in open(sys.argv[2], encoding="utf-8") if l.strip()]
    segs, beats = chunks_and_beats(x, sr)
    tl, r = align(segs, beats, phrases)
    for g in tl:
        print(f"{g['start']:6.2f}-{g['end']:6.2f} a{g['audio_syl']:3d} t{g['text_syl']:3d} | {' / '.join(g['phrases'])}", file=sys.stderr)
    print(f"duration {len(x)/sr:.2f}s, rate {r:.2f}", file=sys.stderr)
    json.dump({"duration": round(len(x) / sr, 2), "timeline": tl}, sys.stdout, ensure_ascii=False, indent=1)
