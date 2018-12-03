const { readdirSync } = require('fs')

const makeFilelist = (filter) => {
  return heard = readdirSync('./')
}

module.exports = [
  {
    type: 'list',
    name: 'subtitleInput',
    message: 'Please select a subtitle to work with: alike subtitle.ass...',
    choices: makeFilelist()
  },
  {
    type: 'input',
    name: 'outputPath',
    message: 'Please specific output file name: alike out...'
  }
]
