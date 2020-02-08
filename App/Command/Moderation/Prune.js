/* eslint-disable */
const { Client, Message } = require('@components/DiscordClient')
/* eslint-enable */

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  const channel = message.channel
  let count = 0

  if (!args[0]) {
    message.reply(client.usage('Moderation::Prune'))
    return undefined
  } else {
    count = parseInt(args[0])
  }

  await message.delete()
  await channel.bulkDelete(count)
  await message.reply(`berhasil menghapus **${count} pesan** di channel ini.`)
    .then(m => {
      setTimeout(() => {
        m.delete()
      }, 3000)
    })
}
