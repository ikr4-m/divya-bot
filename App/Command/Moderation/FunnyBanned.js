const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  const memberBan = message.mentions.members.first() || message.guild.members.get(args[0])
  const reason = args.slice(1).join(' ')

  if (!memberBan) {
    message.reply(client.usage('Moderation::Kick'))
    return undefined
  }

  let messageReplay = `${memberBan.user.tag} telah dibanned`
  // Apabila ada alasan, tambahin alasannya
  if (reason.length > 0) {
    messageReplay += ` dengan alasan:\n\`\`\`${reason}\`\`\``
  }

  // Pertama, kirim dulu
  await message.reply(messageReplay)

  // Kedua, delay 1 detik terus boongin
  setTimeout(() => {
    message.channel.send('Tapi boong.')
  }, 5000)
}
