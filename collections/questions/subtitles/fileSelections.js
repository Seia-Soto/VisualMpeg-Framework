const { readdirSync } = require('fs')

const makeFilelist = (filter) => {
  return heard = readdirSync('./')
}

module.exports = [
  {
    type: 'list',
    name: 'videoInput',
    message: 'Please select which video to work with: alike video.mp4 and video.mkv...',
    choices: makeFilelist()
  },
  {
    type: 'list',
    name: 'subtitleInput',
    message: 'Please select which subtitle to work with: alike subtitle.ass...',
    choices: makeFilelist('.ass')
  },
  {
    type: 'input',
    name: 'outputPath',
    message: 'Please specific output file name: alike out...'
  },
  {
    type: 'input',
    name: 'metaLanguage',
    message: 'Please specific language value in metadata: alike eng and kor...'
  }
]
