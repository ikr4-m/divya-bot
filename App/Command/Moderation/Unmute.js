const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
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
  const member = message.mentions.members.first() || guild.members.get(args[0])
  const key = `${guild.id}|${member.id}`

  const role = guild.roles.find(r => r.name === 'Muted')

  if (role.size === 0) {
    message.reply('tidak ada role Muted di server ini!')
    return undefined
  }

  // Paksa hapus
  if (!db.has(key)) {
    message.reply('member tidak pernah dimute sebelumnya atau server sudah restart. Silahkan diperiksa terlebih dahulu.')
    return undefined
  } else {
    db.unset(key).write()
  }

  await member.removeRoles([role])
  await message.reply(`bungkaman untuk ${member.user.tag} berhasil dilepas!`)
  await member.send(`Bungkaman anda berhasil dilepas di server **${guild.name}**`)
}
