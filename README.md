# YouTube Shorts Forger

A Claude Code skill for the **FictionInAMinute** channel: tell a real story, get a two-part
YouTube Shorts series (Malayalam by default, or any voice language you choose) with animated scenes synced to your own AI Studio voice.

Runs inside Claude Code, so it uses your Claude subscription. No API keys, no paid services.

## Run it

1. Open **claude.ai/code** (or the Claude app → Code) and start a new session with this repository selected.
2. Type `/story-shorts`, or just send your story.
3. Follow the checklist. Every step waits for your OK:

| Step | You do | Claude does |
|---|---|---|
| 1. Story → Part 1 & 2 | Send the story, approve or correct | Writes both parts in casual Malayalam, ~1 min each, lists assumptions |
| 2. Voice scripts | Generate the audio in Google AI Studio, send both files | Gives paste-ready scripts and the Style text for each part |
| 3. Videos | Watch them | Syncs scenes and English captions to your voice, renders 1080×1920 Shorts |
| 4. Review | Reply "OK" or list fixes with times | Fixes and re-renders until the videos are final |
| 5. Upload text | Approve or tweak | Title, description, keywords, hashtags and pinned comment for each part, in the voice language |

Progress is saved in `stories/<story>/progress.md`, so a new session continues where you stopped.

## What's inside

- `.claude/skills/story-shorts/SKILL.md`: the workflow and the channel's rules.
- `engine/`: the drawing engine (characters, vehicles, places, captions) and the page template.
- `tools/estimate.py`: estimates the voice length of a script.
- `tools/align.py`: syncs a script to the recorded voice by counting syllables.
- `tools/preview.js`, `tools/render.js`, `tools/encode.sh`: preview frames, render, and encode the Shorts MP4.
- `examples/`: scene files from the published stories (the scooter story and Unplanned Trip).

## Requirements

The Claude Code cloud environment already has Python 3, ffmpeg, Node and Playwright with Chromium.
Running locally needs the same: `pip install numpy`, `npm i playwright`, and ffmpeg on PATH.
