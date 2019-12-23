const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
const Moment = require('moment')

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = (client, message, args) => {
  const now = Moment()
  const hour = now.diff(client.uptimeDate, 'hour')
  const minute = now.diff(client.uptimeDate, 'minute')
  const second = now.diff(client.uptimeDate, 'second')

  message.reply(
    `bot ini telah aktif selama **${hour} jam, ${minute} menit, dan ${second} detik**. [${Moment(client.uptimeDate).format()}]`
  )
}