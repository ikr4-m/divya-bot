require('module-alias/register')
require('dotenv').config()
const Discord = require('@components/DiscordClient')
const fs = require('fs')

const Client = new Discord.Client({
  // Reserved for config
})

// Require Commando in Routes
fs.readdir('./Routes/', (err, files) => {
  if (err) throw err
  files.forEach(file => {
    require(`./Routes/${file}`)(Client)
  })
})

Client.login(process.env.BOT_TOKEN)
