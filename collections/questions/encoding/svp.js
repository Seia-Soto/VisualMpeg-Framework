const { readdirSync } = require('fs')

const makeFilelist = (filter) => {
  return heard = readdirSync('./')
}

module.exports = [
  {
    type: 'list',
    name: 'videoInput',
    message: 'Please select a video to work with: alike video.mp4 and video.mkv...',
    choices: makeFilelist()
  },
  {
    type: 'input',
    name: 'targetFramerate',
    message: 'Please specific framerate for new video: alike 60.00...'
  },
  {
    type: 'input',
    name: 'outputPath',
    message: 'Please specific output file name: alike out...'
  }
]
