const crypto = require('crypto')
const chalk = require('chalk')
const exec = require('child_process')
const fs = require('fs')

const functions = require('./functions')

const frames = ['-', '\\', '|', '/']
let buff = 'Initializing, waitting for first data...'
let i = 0
let t = false

module.exports = (inquirer, collections, answers) => {
  inquirer
    .prompt(collections.questions.subtitles.convert)
    .then(answers => {
      const streamDispatcher = setInterval(() => {
        const frame = frames[i = ++i % frames.length]
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(chalk.white.bgCyan(`${frame} Encoding... ${buff}`))
      }, 80)

      const ffmpeg = exec.spawn('ffmpeg', [
        '-y',
        '-i', `"${answers.subtitleInput}"`,
        `"${answers.outputPath || 'visualmpeg_out.' + answers.subtitleInput.replace(`.${answers.subtitleInput.split('.')[answers.subtitleInput.split('.').length - 1]}`, '')}.ass"`
      ], {
        shell: true
      })

      ffmpeg.on('close', code => {
        console.log(chalk.white.bgGreen(`\n✔️ Done encoding! Output file is located in '${answers.outputPath || 'visualmpeg_out.' + answers.subtitleInput.replace(`.${answers.subtitleInput.split('.')[answers.subtitleInput.split('.').length - 1]}`, '')}.ass`))
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
