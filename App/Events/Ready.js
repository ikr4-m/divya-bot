const { Client } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 */
module.exports = (client) => {
  client.console.info(`${client.user.username}#${client.user.discriminator} is ready!`)
  // Jika mode development menyala, lu bisa liat command apa aja
  // yang terload di bot ini.
  if (process.env.DEV === 'true') {
    console.log('Command:')
    console.log(client.commands)
    console.log('Alias:')
    console.log(client.aliases)
    console.log('Help:')
    console.log(client.helps)
  }
}
