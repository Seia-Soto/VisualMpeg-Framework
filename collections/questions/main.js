module.exports = {
  type: 'list',
  name: 'todo',
  message: '< VisualMpeg >\nversion: 0.0.7\ncoverage (checked): *.mp4, *.ass, *.srt (convert only), *.smi (convert only)\n\nAll subtitles will be converted into ass format.\n\nSelection: ',
  choices: [
    'burnSubtitle;\n  Burn subtitle to specific video.',
    'convertSubtitle;\n  Convert subtitle into ASS Subtitle format.',
    'setFramerate;\n  Make videos 60 fps by using SVP re-encoding.'
  ]
}
