const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
const SWarnList = require('@schema/WarnList')
const Moment = require('moment')

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  const ReasonCode = `WR!${Moment().format('YYYYMMDDHHmmss')}`
  const memberWarn = message.mentions.members.first() || message.guild.members.get(args[0])
  if (!memberWarn) {
    message.reply(client.usage('Moderation::Warn'))
    return undefined
  }

  // Reason dari member
  const _reason = args.slice(1).join(' ')
  const reason = _reason.length > 0 ? _reason : 'Tidak ada alasan'
  const auditReason = `${ReasonCode}:${reason} | ${message.author.tag}`

  // Masukkan data warning di database.
  const database = client.database(SWarnList)
  const data = await database.getBulk({ memberID: memberWarn.id, guildID: message.guild.id })
  let warnCount = 0
  if (data.length === 0) {
    // Apabila masih baru untuk di warning, totalkan
    database.create({
      memberID: memberWarn.id,
      guildID: message.guild.id,
      infractions: [
        {
          code: ReasonCode,
          reason: reason,
          staffID: message.author.id
        }
      ]
    })
    warnCount = 1
  } else {
    // Sempat filter dua kali untuk memastikan ini member ada
    // dan ada di server tersebut
    const newData = data[0]
    newData.infractions.push({
      code: ReasonCode,
      reason: reason,
      staffID: message.author.id
    })
    database.set(newData._id, newData)
    warnCount = newData.infractions.length
  }

  // Apabila dia adalah member biasa, eksekusi
  if (!memberWarn.hasPermission('VIEW_AUDIT_LOG')) {
    switch (warnCount) {
      case 2:
        // mute 6 jam
        break
      case 3:
        // kick
        if (memberWarn.kickable) {
          message.channel.send(
            `Terhitung 3 kali peringatan, waktunya menendang ${memberWarn.user.tag}`
          )
          memberWarn.kick(auditReason)
        }
        break
      case 4:
        // mute sehari
        break
      case 5:
        // ban, bisa banding
        if (memberWarn.bannable) {
          message.channel.send(
            `Terhitung 5 kali peringatan, waktunya membanned ${memberWarn.user.tag}. Masih bisa banding kok.`
          )
          memberWarn.ban(auditReason + ' | Banding')
        }
        break
      case 7:
        // the last time banned
        if (memberWarn.bannable) {
          message.channel.send(
            `Terhitung 7 kali peringatan, waktunya membanned ${memberWarn.user.tag}. Ini yang terakhir kalinya bagimu.`
          )
          memberWarn.ban(auditReason + ' | Final Banned')
        }
        break
    }
  }

  message.channel.send(
    `${memberWarn.user.tag} berhasil diberi peringatan dengan alasan:\n\`\`\`${reason} | Terhitung ${warnCount} kali pelanggaran.\`\`\``
  )
}
