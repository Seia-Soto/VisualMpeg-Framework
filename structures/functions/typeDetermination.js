const chalk = require('chalk')
const mime = require('mime-types')

module.exports = (files, type) => {
  if (Object.values(files).includes(undefined)) {
    console.log(chalk.white.bgRed('There is not enough arguments in your request.'))
    process.exit(1)
  }

  const tests = {
    addSubtitle: [
      (mime.lookup(`./${files.videoInput}`) !== 'video/mp4'),
      (!files.subtitleInput.endsWith('.ass'))
    ]
  }

  if (tests[type]) return false
}
