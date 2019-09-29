const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 * @param {Message} message
 */
module.exports = (client, message) => {
  if (message.content === 'Ping') {
    message.channel.send('Pong!')
  }
}
