#!/usr/bin/env node
const chalk = require('chalk')
const inquirer = require('inquirer')
const logUpdate = require('log-update')
const shx = require('shelljs')

const collections = require('./collections')
const structures = require('./structures')

// Checks if FFmpeg installed on this system.
if (!shx.which('ffmpeg')) {
  console.log(chalk.white.bgRed('Cannot load FFmpeg-binaries from your system, please check FFmpeg is installed in your system.'))
  process.exit(0)
}

inquirer
  .prompt(collections.questions.main)
  .then(answers => {
    structures[answers.todo.split(':')[0]](inquirer, collections, answers)
  })
