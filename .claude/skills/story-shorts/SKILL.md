---
name: story-shorts
description: Turn a real-life story the user tells (voice-typed, any language) into one YouTube Short or a two-part Shorts series (decided per story) for the FictionInAMinute channel - scripts in the chosen voice language (Malayalam by default), Google AI Studio voice scripts and Style text, animated 1080x1920 videos synced to the user's recorded voice with English captions, review fixes, and upload text (title and pinned comment in the voice language; description, keywords and hashtags in English). Use when the user runs /story-shorts, sends a new story for the channel, or asks to continue a story that is in progress.
---

# Story → YouTube Shorts (1 video or a 2-part series)

You run a five-step pipeline with the user. **Every step ends at a gate: show the result, then stop and wait for the user.** Never run ahead to the next step on your own.

```
☐ 1. Story → 1 part or Part 1 & 2          (gate: user approves the text)
☐ 2. Voice scripts + Style for AI Studio     (gate: user sends both audio files)
☐ 3. Videos (YouTube Shorts only)            (gate: user reviews)
☐ 4. Review → fixes → final videos           (gate: user says the videos are final)
☐ 5. Upload text                             (gate: user approves the text)
```

**Voice language.** Ask in step 1 which language the voice will be in, unless the story or the user already makes it clear; default **Malayalam**. Write the scripts, the AI Studio scripts, and the step 5 title and pinned comment in that language (in its own script). The step 5 description, keywords and hashtags are always English. English captions stay English in every case.

## Progress file (do this first, every time)

Each story lives in `stories/<slug>/` (slug: short lowercase, e.g. `unplanned-trip`).
- On `/story-shorts` with no story text: list `stories/*/progress.md`. If one is unfinished, show its checklist and ask whether to continue it or start a new story.
- New story: create `stories/<slug>/progress.md` from the template at the end of this file.
- After each gate is passed, tick the step (`☑`), note the date and the key decisions (approved facts, file names, audio lengths), and save the approved texts in the story folder (`part1.ml.txt`, `part2.ml.txt`, `part1.aistudio.txt`, `part1.style.txt`, ...).
- Show the checklist at the top of every reply, so the user always sees where they are.
- If the repository is attached with push access, commit and push the story folder after every gate (never commit audio, frames or MP4s - `.gitignore` excludes them). If it can't be pushed, say so once.

## Step 1 - Story → one part or two parts, in the voice language

1. Read the story. List the facts you rely on: people (use the names the user gives; the narrator is "ഞാൻ"), places, vehicles, amounts, year, the order of events, the big moments.
2. Decide **one or two parts** from the story itself and tell the user why; they can override it.
   - **One part** when the story fits a minute without losing its best moments, or has a single twist that lands near the end. It builds up and pays off in the same video, ending on the funniest or warmest line.
   - **Two parts** when there's enough for two minutes and a natural cliffhanger in the middle. Part 1 builds up to the most surprising turn and **stops right on it**; Part 2 resolves it and ends on the funniest or warmest line.
   - Never stretch a one-part story into two. Everything below that says "each part" applies to the single part too; skip anything that only makes sense for two parts (cliffhanger ending, links between parts).
3. Write the part(s) in the **casual spoken voice language** (for Malayalam: standard Malayalam unless the user asks for a dialect, in Malayalam script).  The rules below are written for Malayalam; apply the same idea in other languages. English words people say anyway stay English but are written in Malayalam script (ക്ലാസ്, ടെൻഷൻ, സർവീസ് സെന്റർ). Short lines, one breath each. Dialogue: introduce the speaker, then put the line in quotes.
4. Format each part like the user's approved scripts:
   - First line is the title, read aloud: `<series title>... – പാർട്ട് 1` (Part 2: `– പാർട്ട് 2`). A single-part story uses just the title, with no part number.
   - Part 1 ends: `ബാക്കി... പാർട്ട് 2-ൽ!` (or the user's preferred ending).
   - Part 2 does **not** recap Part 1 and repeats nothing; it ends warm/nostalgic.
   - No line or fact said twice. Keep both parts free of repeated words where a synonym works.
5. Length: run `python3 tools/estimate.py` on each part. Target **55-62 s, hard maximum 66 s** each (calibrated on Malayalam: 783 spoken characters ≈ 61.7 s with the channel's voice; for another language, treat the estimate as rough and re-calibrate from the first recording, noting the new chars-per-second in progress.md). If too long, cut connectives and re-told facts first, never the punchline.
6. Under the scripts, list every detail you **assumed or added** (an amount, who said what, a joke) and ask the user to confirm. Never present an invented fact as true.
7. **Gate:** "Approve, or tell me what to change." Apply changes exactly as asked (the user's wording wins), re-estimate length, and repeat until approved.

## Step 2 - Voice scripts and Style for Google AI Studio

For each part give, in separate code blocks so they copy cleanly:

- **Script**: the approved Malayalam text as plain lines with blank lines between them. Use `...` for short pauses and `[pause]` sparingly (before a twist or punchline). No timestamps, markdown, emoji or speaker labels.
- **Style** (paste into AI Studio's Style box). Base it on this proven text and adapt the emotional beats to the part:

```
Narrate in Malayalam at a lively pace, slightly quicker than normal conversation, so the whole script finishes in about 60 seconds and never more than 65 seconds. Sound like a friend telling a real story. Keep clear Malayalam pronunciation, with every word fully spoken and nothing swallowed. Keep pauses at "..." short and [pause] to a brief beat, with no gaps between lines. <emotional beats for this part: e.g. start light, build tension at X, shocked at Y, deadpan at Z>. <Part 1: end with a curious, teasing cliffhanger. Part 2: end slow, warm and nostalgic.>
```

Remind the user: use the **same Speaker** for every part and every story (channel voice). Give the estimated length again.
**Gate:** wait for the audio file(s), one per part. When they arrive, check each with `ffprobe`; if a part runs over 66 s, tell the user and offer to re-generate or speed it up ≤8% with `atempo` (pitch-safe).

## Step 3 - Videos (YouTube Shorts only)

Work in `stories/<slug>/part1/` (and `part2/` for a two-part story). Copy `engine/template.html` to `index.html` in each.

**3a. Sync - never guess timings.** No speech recognition is available, so align by syllables:
1. Write `phrases.txt`: the exact spoken script, one short phrase per line (split at `...`, `,`, `.`, `?`, `!`), numbers written as the words the voice says (`5000` → `അയ്യായിരം`, `പാർട്ട് 1` → `പാർട്ട് വൺ`).
2. `python3 tools/align.py <audio.wav> phrases.txt > timeline.json` (convert MP3s to WAV with ffmpeg first). Read the printed table: the audio (`a`) and text (`t`) syllable counts should rise and fall together. If several phrases share one chunk, split the time by syllable share. If the counts disagree badly in one region, try the other script version the user may have recorded (they sometimes record an earlier draft) and keep the lower-cost fit.
3. Every scene starts and every caption appears at its phrase's start time. Key visual beats (impact, reveal, shout) land on the exact phrase that names them.

**3b. Scenes** - write `scenes.js` using the engine (`engine/engine.js`; its header lists everything available). Start from the closest example in `examples/` and reuse its pieces. Rules the user asked for:
- Same cast across a series and across stories: the narrator `ME` (blue shirt) and friends `F1`–`F4`; recurring vehicles keep their look (`suv` = the user's blue Terrano, boxy SUV). Count people correctly (if five went on the trip, show five; in the car use `heads:5`).
- **No on-screen text labels, no emoji.** Allowed text: the title card at the start, the end card ("ബാക്കി... പാർട്ട് 2" on Part 1), and the English captions. Drawn `?`/`!` symbols are fine sparingly.
- **Never block a face**: draw vehicles and props before people when they overlap; check every preview.
- Captions are English, one per phrase or sentence, shown near the top (engine CSS). Translate faithfully and naturally; keep Malayalam names and words like "Chetta" where they carry flavour.
- Don't draw real people (actors, celebrities) or recreate film scenes; show the friends' own reaction instead.
- New objects not in the engine: draw them in the same flat style (thick dark outlines, flat colours) and add reusable ones to `engine/engine.js`.

**3c. Check before rendering.** `node tools/preview.js stories/<slug>/part1 <t1> <t2> ...` with one time per scene, then **look at `preview/sheet.png`** and at full-size frames for anything doubtful (overlaps, cut-off text, faces hidden, wrong count of people). Fix and re-preview.

**3d. Render and encode.**
```
node tools/render.js stories/<slug>/part1 <audio duration>
tools/encode.sh stories/<slug>/part1 <audio.wav> stories/<slug>/<Title>_Part1_Shorts.mp4
```
Only the YouTube Shorts format (1080×1920, 30 fps, H.264 + AAC, faststart). Send the MP4(s) to the user with SendUserFile (`display: "attach"`), with a short scene list and the main sync points (time → line).
**Gate:** ask the user to watch and reply "OK" or list fixes with times.

## Step 4 - Review, fixes, final videos

- For each comment, find the scene by time, fix only that, re-preview that moment, re-render, re-encode, re-send. If the user says sync is off, re-run alignment rather than nudging blindly.
- When the user says the videos are final, tick step 4 and move to step 5.

## Step 5 - Upload text

For **each part**, give these five items, each in its own code block. **Title and pinned comment are in the voice language** chosen in step 1 (its own script); **description, keywords and hashtags are in English**.
- **Title** (voice language): catchy, hints at the twist without giving it away, under ~70 characters, for two-part stories ends with `| <series title> <part word> N` (Malayalam: `പാർട്ട് N`). Offer 2-3 alternatives and say which you pick and why.
- **Description** (English): hook, short teaser of the story, mention it's told in <voice language> with English subtitles, for two-part stories a "Watch Part 1 / Part 2: [link]" line, a question inviting comments, then the 5 main hashtags.
- **Keywords** (English, Tags box): comma-separated search terms, including the language and region (e.g. "malayalam storytime", "kerala shorts").
- **Hashtags** (English): 5 for the description (first 3 show above the title, always include `#shorts`) plus extras.
- **Pinned comment** (voice language): ends with a question that invites replies; Part 1's teases Part 2, Part 2's links back to Part 1.
Under the title and pinned comment, add a one-line English meaning for the user (not for pasting). For a two-part story add the after-upload tips: link Part 1 ↔ Part 2 (description, pinned comment, Related video), put both parts in one playlist. For a single story, leave out the part links and make the pinned comment ask viewers for their own similar story.
**Gate:** apply any changes the user asks for; when they approve, tick step 5 and mark the story done.

## Things that are not possible here (say so plainly)

- Making the voice: the user records it in Google AI Studio.
- Listening to audio: alignment is by syllable counting, so ask the user to report any moment that feels off.
- Only YouTube Shorts files are produced unless the user asks for another format.

## progress.md template

```
# <Series title> (<slug>)
Started: <date>

☐ 1. Story → 1 part or Part 1 & 2
☐ 2. Voice scripts + Style
☐ 3. Videos (YouTube Shorts)
☐ 4. Review → final videos
☐ 5. Upload text (title, description, keywords, hashtags, pinned comment)

Voice language: <Malayalam>
Parts: <1 or 2>

## Facts confirmed by the user
- ...

## Notes
- Part 1 audio: <file>, <length>
- Part 2 audio: <file>, <length>
```
