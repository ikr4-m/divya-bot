const chalk = require('chalk')
const stringFormat = require('string-format')
const os = require('os')

/**
 * @param {string} flag
 * @param {string} message
 */
function consoles (flag, message) {
  let ret = ''
  ret = stringFormat('[{time}] {device}/{pid} ',
    {
      time: chalk.default.blue(new Date().toISOString()),
      device: os.hostname(),
      pid: chalk.default.red(process.pid)
    }
  )

  const newRet = ret
  const entry = message.split('\n')
  let finVal = ''

  if (entry.length > 1) {
    entry.forEach(txt => {
      finVal += `\n${' '.repeat(4)}${txt}`
    })
  } else {
    finVal = message
  }

  return newRet + `${flag}: ${finVal}`
}

module.exports = {
  /**
   * @param {string} message
   * @return {void}
   */
  info: (message) => {
    console.log(consoles(' INFO', message))
  },
  /**
   * @param {string} message
   * @return {void}
   */
  error: (message) => {
    console.log(consoles('ERROR', message))
  }
}
