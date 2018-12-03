#!/usr/bin/env node
const chalk = require('chalk')
const fs = require('fs')
const inquirer = require('inquirer')
const shx = require('shelljs')

const collections = require('./collections')
const structures = require('./structures')

// Checks if FFmpeg installed on this system.
if (!shx.which('ffmpeg')) {
  console.log(chalk.white.bgRed('Cannot load FFmpeg-binaries from your system, please check FFmpeg is installed in your system.\n\nYou can install FFmpeg into your system by https://ffmpeg.org'))
  process.exit(0)
}

if (!fs.existsSync('./visualmpeg')) {
  fs.mkdirSync('./visualmpeg')
  console.log(chalk.white.bgGreen(`\n✔️ Created work directory: './visualmpeg'`))
}

inquirer
  .prompt(collections.questions.main)
  .then(answers => {
    structures[answers.todo.split(';')[0]](inquirer, collections, answers)
  })
