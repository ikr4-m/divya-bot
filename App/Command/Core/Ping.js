const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = (client, message, args) => {
  const startTime = Date.now()
  message.channel.send(':ping_pong: Wait for it...')
    .then(msg => {
      const diff = (Date.now() - startTime).toLocaleString()
      const api = client.ping.toFixed(0)
      msg.edit(`Latency: ${diff} ms | API: ${api} ms.`)
    })
}
