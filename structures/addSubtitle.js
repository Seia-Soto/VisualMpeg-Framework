const chalk = require('chalk')
const exec = require('child_process')

const frames = ['-', '\\', '|', '/']
let buff = 'Initializing, waitting for first data..'
let i = 0

module.exports = (inquirer, collections, answers) => {
  inquirer
    .prompt(collections.questions.subtitles.fileSelections)
    .then(answers => {
      if (!answers.subtitleInput.endsWith('.ass')) {
        const ffmpeg = exec.spawn('ffmpeg', ['-i', `${answers.subtitleInput}`, `${answers.subtitleInput}.ass`])
        ffmpeg.on('close', code => {
          answers.subtitleInput += '.ass'
          console.log(chalk.white.bgGreen(`${code}: Saved converted subtitle into '${answers.subtitleInput}'.`))
        })

        /*
        ffmpeg.stderr.on('data', data => {
          const buff = new Buffer.from(data)
          console.error(buff.toString())
        })
        */
      }

      const streamDispatcher = setInterval(() => {
        const frame = frames[i = ++i % frames.length]
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(chalk.white.bgCyan(`${frame} Encoding... ${buff}`))
      }, 80)

      const ffmpeg = exec.spawn('ffmpeg', [
        '-y',
        '-i', answers.videoInput,
        '-sub_charenc', 'UTF-8',
        '-metadata:s:s:0', `language=${answers.metaLanguage}`,
        '-vf', `subtitles=filename=${answers.subtitleInput}`,
        '-acodec', 'copy',
        `${answers.outputPath}.${answers.videoInput.split('.')[answers.videoInput.split('.').length - 1]}`
      ], {
        shell: true
      })

      ffmpeg.on('close', code => {
        console.log(chalk.white.bgGreen(`\n✔️ Done encoding! Output file is located in './${answers.outputPath}.${answers.videoInput.split('.')[answers.videoInput.split('.').length - 1]}'`))
        process.exit(0)
      })

      ffmpeg.stderr.on('data', data => {
        const rawData = new Buffer.from(data)
        buff = rawData.toString()
      })

      /*
      ffmpeg.stderr.on('data', data => {
        const buff = new Buffer.from(data)
        console.error(buff.toString())
      })
      */
    })
}
