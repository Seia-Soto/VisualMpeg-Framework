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
  const callbacks = {
    addSubtitle: () => {
      console.log(chalk.white.bgRed('Cannot identify video and subtitles\' format.\n\n<allowedVideoFormat> video/mp4\n<allowedSubtitleFormat> *.ass'))
      process.exit(1)
    }
  }

  if (!tests[type]) callbacks[type]()
}
