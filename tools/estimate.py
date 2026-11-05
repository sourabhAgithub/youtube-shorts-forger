#!/usr/bin/env python3
"""Estimate how long a Malayalam voice script will run in Google AI Studio.

Calibrated on real recordings made with the channel's usual Speaker + Style:
  Part 1 of "Unplanned trip": 783 spoken characters -> 61.7 s.
Usage: python3 tools/estimate.py script.txt [more.txt ...]
"""
import re, sys
SECONDS_PER_CHAR = 61.68 / 783

def spoken_chars(text: str) -> int:
    text = re.sub(r"\[[^\]]*\]", "", text)            # [pause] tags are not spoken
    return len(re.sub(r'[\s\.\,\!\?"\'–\-:;()]', "", text))

for path in sys.argv[1:]:
    t = open(path, encoding="utf-8").read()
    c = spoken_chars(t)
    print(f"{path}: {c} chars ≈ {c*SECONDS_PER_CHAR:.0f} s (aim 55–62 s; hard max 66 s)")
