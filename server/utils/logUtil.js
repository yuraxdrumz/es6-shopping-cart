/**
 * Created by Yurasya on 10/28/2016.
 */
const chalk = require('chalk')

let log = {
  black:(args)=>console.log(chalk.black(args)),
  red:(args)=>console.log(chalk.red(args)),
  green:(args)=>console.log(chalk.green(args)),
  yellow:(args)=>console.log(chalk.yellow(args)),
  blue:(args)=>console.log(chalk.blue(args)),
  magenta:(args)=>console.log(chalk.magenta(args)),
  cyan:(args)=>console.log(chalk.cyan(args)),
  white:(args)=>console.log(chalk.white(args)),
  gray:(args)=>console.log(chalk.gray(args))
}

module.exports = log


