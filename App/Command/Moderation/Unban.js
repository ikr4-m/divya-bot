const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  const idMember = args[0]
  try {
    await message.guild.unban(idMember)
    await message.channel.send('User tersebut berhasil di unban!')
  } catch (e) {
    message.reply('sepertinya anda salah mengetikkan ID dari user tersebut.')
  }
}
