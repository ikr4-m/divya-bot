const { Client } = require('@components/DiscordClient') // eslint-disable-line
const express = require('express')
const app = express()
const port = 3000

/**
 * @param {Client} client
 */
module.exports = (client) => {
  app.get('/', (req, res) => res.send('Hello world'))
  app.listen(port, () => {
    client.console.info('Taking a heartbeat!')
  })

  // Interval to remove .git in glitch
  if (process.env.DEV !== 'true') {
    setInterval(() => {
      client.console.info('Removing .git folder to save spaces.')
      const { exec } = require('child_process')
      exec('rm -rf .git')
    }, 7200000)
  }
}
