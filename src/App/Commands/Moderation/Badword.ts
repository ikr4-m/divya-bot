import { Message, MessageEmbed } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'

export default class Badword extends Command {
  constructor() {
    super({
      name: 'badword',
      description: 'Kelola anti invite di server ini.',
      args: [
        { name: 'modify|immune', require: false, type: 'BLOCK' },
        { name: 'modify=badword', require: false, type: 'BLOCK' },
        { name: 'immune=roleID|roleMention', require: false, type: 'BLOCK' }
      ],
      example: 'badword modify bego'
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const executor = await message.guild.members.fetch(message.author.id)
    if (!executor) return
    if (!executor.hasPermission('ADMINISTRATOR') && !client.config.owner.includes(executor.id)) {
      return message.reply('hanya ADMIN yang bisa mengeksekusi perintah ini.')
    }

    const embed = new MessageEmbed()
      .setColor(client.config.botColor)
      .setFooter(`Diminta oleh ${message.author.tag}`, message.author.displayAvatarURL())
      .setTimestamp()

    const toggle = args[0] as 'modify' | 'immune'
    if (!toggle) {
      embed.setTitle(`Daftar Badword di ${message.guild.name}`)

      const list = client.state.badword.get(message.guild.id)
      if (!list) {
        embed.setDescription('Masih kosong.')
      } else {
        embed.setDescription(
          list.list.length > 0
            ? `\`${list.list.join('`, `')}\``
            : 'Masih kosong.'
        )
      }
    } else {
      const _server = client.state.badword.get(message.guild.id)
      if (!_server) client.state.badword.set(message.guild.id, {
        immune: [], list: []
      })
      const server = client.state.badword.get(message.guild.id)
      
      // Mati/nyala
      if (toggle === 'modify') {
        const _badword = args[1]
        if (!_badword) return client.constant.usage(message, this.options.name, this.options.args)
        const badword = _badword.toLowerCase()

        embed.setTitle('Modifikasi Badword')
        if (!server.list.includes(badword)) {
          server.list.push(badword)
          embed.setDescription(`Badword "${badword}" berhasil ditambahkan!`)
        } else {
          server.list.splice(server.list.indexOf(badword), 1)
          embed.setDescription(`Badword "${badword}" berhasil dihapus!`)
        }
      }
      // Immune
      if (toggle === 'immune') {
        // const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        // code
      }
      // Tidak ada yang sama
      if (!['modify', 'immune'].includes(toggle)) {
        return message.reply('inputan tidak valid!')
      }
    }

    await message.channel.send(`<@!${message.author.id}>`, { embed })
  }
}
