const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = (client, message, args) => {
  message.channel.send('pong')
}
