#!/usr/bin/env bash
# Build the YouTube Shorts MP4 from rendered frames + the voice audio.
# Usage: tools/encode.sh stories/<slug>/part1 path/to/voice.wav out.mp4
# Output: 1080x1920, 30 fps CFR, H.264 Main@4.0 (avc1), keyframe every 1 s, AAC-LC 44.1 kHz stereo,
# faststart - plays on any phone and uploads straight to Shorts.
set -euo pipefail
dir="$1"; audio="$2"; out="$3"
ffmpeg -y -loglevel error -framerate 30 -i "$dir/frames/f%05d.jpg" -i "$audio" \
  -c:v libx264 -profile:v main -level:v 4.0 -preset slow -b:v 8M -maxrate 10M -bufsize 16M -pix_fmt yuv420p \
  -g 30 -keyint_min 30 -sc_threshold 0 -r 30 -vsync cfr \
  -c:a aac -profile:a aac_low -b:a 192k -ar 44100 -ac 2 -shortest -movflags +faststart -tag:v avc1 -f mp4 "$out"
ffmpeg -v error -i "$out" -f null - && echo "OK: $out ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out") s)"
