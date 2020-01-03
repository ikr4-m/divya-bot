const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
const Moment = require('moment')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./Components/Database/mute.json')
const db = low(adapter)

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  const guild = message.guild
  const times = args[1].split('.')
  const member = message.mentions.members.first() || guild.members.get(args[0])
  const mTimes = Moment()

  if (!member || !args[0] || !args[1]) {
    message.reply(client.usage('Moderation::Mute'))
    return undefined
  }
  if (member.hasPermission('MANAGE_ROLES')) return message.reply('anda tidak bisa mengeksekusi staff.')

  // Eksekusi timesnya
  const timeInString = []
  times.forEach(t => {
    // Apabila jam
    if (t.endsWith('h')) {
      mTimes.add({ hour: parseInt(t.replace('h', '')) })
      timeInString.push(`${t.replace('h', '')} jam`)
    }
    // Apabila menit
    if (t.endsWith('m')) {
      mTimes.add({ minute: parseInt(t.replace('m', '')) })
      timeInString.push(`${t.replace('m', '')} menit`)
    }
    // Apabila detik
    if (t.endsWith('s')) {
      mTimes.add({ second: parseInt(t.replace('s', '')) })
      timeInString.push(`${t.replace('s', '')} detik`)
    }
  })

  // Reason dari member
  const _reason = timeInString.length === 0 ? args.slice(1).join(' ') : args.slice(2).join(' ')
  const reason = _reason.length > 0 ? _reason : 'Tidak ada alasan'

  // Cari role
  const role = guild.roles.find(r => r.name === 'Muted')
  if (!role) {
    message.reply('buat role yang bernama **Muted** terlebih dahulu sebelum menggunakan perintah ini.')
    return undefined
  }
  if (member.roles.has(role.id)) {
    message.reply('member ini sebelumnya telah dibungkam.')
    return undefined
  }

  // TimeInString apabila panjangnya 0
  let forever = false
  if (timeInString.length === 0) {
    forever = true
    timeInString.push('DM Staff yang bersangkutan untuk lebih lanjut.')
  }

  member.addRole(role)
    .then(async msg => {
      const muteSender = {
        reason: reason,
        timestamp: mTimes.format('YYYY-MM-DD HH:mm:ss'),
        guildID: guild.id,
        memberID: member.id
      }
      if (forever) muteSender.forever = true
      db.set(`${guild.id}|${member.id}`, muteSender).write()
      message.channel.send(
        `<@!${member.id}> berhasil dibungkam dengan alasan:\n\`\`\`[EXP:${mTimes.format('YYYYMMDDHHmmss')}] ${reason} | ${timeInString.join(', ')}\`\`\``
      )
    })
    .catch(err => {
      client.console.error(err.message)
      message.reply('mustahil rasanya untuk membungkam dia. Mungkin karena rolenya yang lebih tinggi dariku.')
      return undefined
    })
}
