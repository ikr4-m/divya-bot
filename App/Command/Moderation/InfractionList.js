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

  let descRet = 'Tidak ada pelanggaran'
  if (data.length > 0) {
    descRet = ''
    data[0].infractions.forEach(warn => {
      descRet += `**${warn.code}: ${warn.reason}** [<@!${warn.staffID}>]\n`
    })
  }
  const embed = new (require('discord.js').RichEmbed)()
    .setColor(client.config.color)
    .setFooter(`Diminta oleh ${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp()
    .setTitle(`Pelanggaran oleh ${member.user.tag}`)
    .setDescription(descRet)

  message.channel.send(`<@!${message.author.id}>`, { embed: embed })
}
