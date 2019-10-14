const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
// const Moment = require('moment')

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  // const codeWarn = `Warn!${Moment().format('YYYYMMDDHHmmss')}`
  const memberWarn = message.mentions.members.first() || message.guild.members.get(args[0])
  if (!memberWarn) {
    message.reply(client.usage('Moderation::Warn'))
    return undefined
  }

  // Reason dari member
  const _reason = args.slice(1).join(' ')
  const reason = _reason.length > 0 ? _reason : 'Tidak ada alasan'
  // const auditReason = `${reason} | ${message.author.tag}`

  // Reserved for DB

  // Apabila ia adalah seorang moderator, warn bohong saja //wtf? //btw .hasPermission dah depreceated, use permissions.has()
  if (memberWarn.hasPermission('VIEW_AUDIT_LOG')) {
    message.reply(`${memberWarn.user.tag} berhasil diberi peringatan dengan alasan:\n\`\`\`${reason}\`\`\``)
    return undefined
  }
}
