const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
const { RichEmbed } = require('discord.js')
const strFormat = require('string-format')

const countTrueFalseMap = (map) => {
  let count = 0
  map.forEach(val => {
    if (val === (true || 'true')) count++
  })
  return count
}

const MemUsage = () => {
  const used = process.memoryUsage()
  let count = 0
  let ret = ''

  for (const key in used) {
    if (count !== 0) ret += '\n'

    count++
    ret += `${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`
  }

  return ret
}

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = (client, message, args) => {
  const guild = client.guilds.get(message.guild.id)

  // Penanggung jawab Bot
  const embedMaintenerBot = new RichEmbed()
    .setColor(client.config.color)
    .setThumbnail(client.user.displayAvatarURL)
    .setAuthor(`[${guild.nameAcronym}] ${guild.name}, dan bot ini.`, guild.iconURL)

    .addField(
      'Maintener',
      client.config.maintener.map(m => `<@!${m}>`).join(' | '),
      true
    )
    .addField(
      'Beta Tester',
      client.config.beta_test.map(m => `<@!${m}>`).join(' | '),
      true
    )
    .addField(
      'Perintah yang tersedia',
      `${client.commands.size} perintah.`,
      true
    )
    .addField(
      'Memori yang digunakan',
      MemUsage(),
      true
    )
    .addField(
      'Bot Repository',
      '[@github-skymunn://gsp-bot](https://github.com/skymunn/gsp-bot)'
    )

  // Informasi server
  const embedServerInformation = new RichEmbed()
    .addField(
      'ID Server', guild.id, true
    )
    .addField(
      'Server Region', guild.region, true
    )
    .addField(
      'Jumlah Member',
      strFormat(
        '{online} siap ngeghibah.\n{idle} lagi molor.\n{dnd} lagi sibuk.\n{offline} lagi kehabisan kuota',
        {
          online: countTrueFalseMap(guild.members.map(m => m.presence.status === 'online')),
          idle: countTrueFalseMap(guild.members.map(m => m.presence.status === 'idle')),
          dnd: countTrueFalseMap(guild.members.map(m => m.presence.status === 'dnd')),
          offline: countTrueFalseMap(guild.members.map(m => m.presence.status === 'offline'))
        }
      ),
      true
    )
    .addField(
      'Jumlah Channel', `${guild.channels.size} tempat ghibah.`, true
    )
    .addField(
      'Jumlah Role', `${guild.roles.size - 1} julukan yang artinya gajelas.`, true
    )
    .setColor(client.config.color)
    .setFooter(`Diminta oleh ${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp()

  // Kirim deh
  message.channel.send(`<@!${message.author.id}>`, { embed: embedMaintenerBot })
  message.channel.send(embedServerInformation)
}
