/**
 * GSP-Bot (C) 2019 - Gamer Source Pub
 * Dibuat oleh github:skymunn menggunakan Simple Discord Framework
 * buatan sendiri.
 */

require('module-alias/register')
require('dotenv').config()
const Discord = require('@components/DiscordClient')
const fs = require('fs')

const Client = new Discord.Client({
  // Reserved for config
})

if (process.argv[2]) {
  process.env.DEV = 'true'
  Client.console.info('In develop mode.')
}

// Ping
require('@scripts/ExpressPing')(Client)

// Require Commando in Routes
fs.readdir('./Routes/', (err, files) => {
  if (err) throw err
  files.forEach(file => {
    require(`./Routes/${file}`)(Client)
  })
})

Client.login(process.env.BOT_TOKEN)
