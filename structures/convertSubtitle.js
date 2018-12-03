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
      t = crypto.createHash('md5').update(answers.subtitleInput).digest('hex')
      fs.writeFileSync(`./visualmpeg/${t}.${answers.subtitleInput}`, fs.readFileSync(`./${answers.subtitleInput}`, 'utf8'), 'utf8')

      const streamDispatcher = setInterval(() => {
        const frame = frames[i = ++i % frames.length]
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(chalk.white.bgCyan(`${frame} Encoding... ${buff}`))
      }, 80)

      const ffmpeg = exec.spawn('ffmpeg', [
        '-y',
        '-i', `"./visualmpeg/${t}.${answers.subtitleInput}"`,
        `"${answers.subtitleInput || 'visualmpeg_out.' + answers.subtitleInput}.ass"`
      ], {
        shell: true
      })

      ffmpeg.on('close', code => {
        console.log(chalk.white.bgGreen(`\n✔️ Done encoding! Output file is located in './${answers.subtitleInput || 'visualmpeg_out.' + answers.subtitleInput}.ass'`))
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
