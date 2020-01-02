const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  const memberKick = message.mentions.members.first() || message.guild.members.get(args[0])
  if (!memberKick) {
    message.reply(client.usage('Moderation::Kick'))
    return undefined
  }
  if (memberKick.hasPermission('MANAGE_ROLES')) return message.reply('anda tidak bisa mengeksekusi staff.')

  // Reason dari member
  const _reason = args.slice(1).join(' ')
  const reason = _reason.length > 0 ? _reason : 'Tidak ada alasan'
  const auditReason = `${reason} | ${message.author.tag}`

  if (!memberKick.kickable) {
    message.reply(`${memberKick.user.tag} tidak bisa ditendang, mungkin karena rolenya berada di atas bot ini.`)
  } else {
    memberKick.send(
      `Anda telah ditendang dari server **${message.guild.name}** oleh <@!${message.author.id}> dengan alasan:\n\`\`\`${reason}\`\`\``
    ).then(msg => {
      memberKick.kick(auditReason)
      message.channel.send(
      `${memberKick.user.tag} telah ditendang dari server ini dengan alasan:\n\`\`\`${reason}\`\`\``
      )
    })
  }
}
