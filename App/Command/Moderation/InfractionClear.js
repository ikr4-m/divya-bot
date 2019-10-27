const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
const SWarnList = require('@schema/WarnList')

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  const guild = message.guild
  // Ambil member dari ID dan Mention, apabila gaada yanmg ketemu terakhir ambil
  // id author/pengirim pesan
  const member = message.mentions.members.first() ||
    guild.members.get(args[0]) ||
    guild.members.get(message.author.id)

  const database = client.database(SWarnList)
  const data = await database.getBulk({ memberID: member.id, guildID: message.guild.id })

  if (data.length > 0) {
    database.delete(data[0]._id)
  }

  message.reply(`pelanggaran untuk <@!${member.id}> berhasil dihapus!`)
}
