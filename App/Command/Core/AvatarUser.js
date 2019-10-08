const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
const { RichEmbed } = require('discord.js')

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = (client, message, args) => {
  const guild = message.guild
  // Ambil member dari ID dan Mention, apabila gaada yanmg ketemu terakhir ambil
  // id author/pengirim pesan
  const member = message.mentions.members.first() ||
    guild.members.get(args[0]) ||
    guild.members.get(message.author.id)

  // Embed Constructor
  const embed = new RichEmbed()
    .setColor(client.config.color)
    .setAuthor(
      'Klik di sini untuk memperbesar!',
      '',
      member.user.displayAvatarURL
    )
    .setDescription(`${member.user.username}#${member.user.discriminator} avatar.`)
    .setImage(member.user.displayAvatarURL)
    .setFooter(`Diminta oleh ${message.author.username}`, message.author.displayAvatarURL)
    .setTimestamp()

  // Kirim deh
  message.channel.send(`<@!${member.id}>`, { embed: embed })
}
