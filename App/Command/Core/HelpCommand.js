const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
const { RichEmbed } = require('discord.js')
const strFormat = require('string-format')

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = (client, message, args) => {
  const embed = new RichEmbed()
    .setColor(client.config.color)
    .setFooter(`Diminta oleh ${message.author.tag}`, message.author.displayAvatarURL)
    .setThumbnail(client.user.displayAvatarURL)
    .setTimestamp()

  // Apabila args kosong atau command tidak ada, berarti tampilkan semua commandnya
  if (!client.commands.has(args[0])) {
    embed
      .setTitle('Daftar Command Felice')
      .setDescription(
        strFormat(
          'Untuk mengecek cara menggunakan command tersebut, silahkan ketik: \n```{prefix}help <command>```\n' +
          'Catatan penting, untuk argumen yang diperlukan dalam tata cara penggunaan command pun ada beberapa aturan, yakni:\n' +
          '`{prefix}com [args]` **>>** Argumen command ini opsional/boleh tidak ditulis.\n' +
          '`{prefix}com <args>` **>>** Argumen command ini wajib ditulis.\n' +
          '`{prefix}com [menu|m]` **>>** Ini adalah argumen paten, kamu hanya perlu memilih diantara tanda "|" saja.\n\n',
          {
            prefix: client.config.bot_prefix
          }
        )
      )
      .setThumbnail(client.user.displayAvatarURL)

    client.helps.forEach(category => {
      // Peraturan:
      // 1. Jangan tampilkan perintah yang sangat sensitif bagi bot yang ada di
      // direktori Developing
      let cate = category[0]
      const newCate = category.slice(1)
      if (cate.includes('Maintener')) return undefined

      // Apabila Categorynya adalah subcategory
      if (cate.split('::').length > 1) {
        const _cate = cate.split('::')
        cate = `${_cate[0]} [${_cate.slice(1).join('::')}]`
      }

      embed.addField(cate, `\`${newCate.join('` | `')}\``)
    })
  } else {
    // Apabila ada argsnya
    const commands = client.commands.get(args[0])
    // console.log(commands)
    const cmd = typeof commands.command === 'string'
      ? commands.command
      : commands.command[0]
    let desc = commands.description
    if (commands.moderating === true) {
      desc += '\n**PERINGATAN KERAS: Perintah ini mutlak hanya dapat dieksekusi oleh Moderator ke atas**.'
    }
    embed
      .setAuthor(`[${commands.denial}] ${client.config.bot_prefix}${cmd}`)
      .addField('Deskripsi', desc)
      .addField('Alias', typeof commands.command === 'string'
        ? 'Tidak ada alias.'
        : `${client.config.bot_prefix}${commands.command.slice(1).join(`, ${client.config.bot_prefix}`)}`)
      .addField('Cara penggunaan', strFormat(commands.usage, { prefix: client.config.bot_prefix }))
  }

  message.channel.send(`<@!${message.author.id}>`, { embed: embed }
  )
}
