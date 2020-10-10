import { Message, MessageEmbed } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import { GetStaffList } from '../../Module/Moderation/StaffList'
import BadwordClass from '../../Module/Moderation/Badword'
import MBadwordList from '../../Models/BadwordList'

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
          list.list.badword.length > 0
            ? `\`${list.list.badword.join('`, `')}\``
            : 'Masih kosong.'
        )
      }
    } else {
      const _server = client.state.badword.get(message.guild.id)
      if (!_server) client.state.badword.set(message.guild.id, {
        immune: [], list: new BadwordClass([])
      })
      const server = client.state.badword.get(message.guild.id)
      
      // Mati/nyala
      if (toggle === 'modify') {
        const _badword = args[1]
        if (!_badword) return client.constant.usage(message, this.options.name, this.options.args)
        const badword = _badword.toLowerCase()

        embed.setTitle('Modifikasi Badword')
        if (!server.list.hasBadword(badword)) {
          server.list.addBadowrd(badword)
          embed.setDescription(`Badword "${badword}" berhasil ditambahkan!`)
          await MBadwordList.create({
            serverID: message.guild.id,
            badword: badword,
            memberID: message.author.id
          })
        } else {
          server.list.removeBadword(badword)
          embed.setDescription(`Badword "${badword}" berhasil dihapus!`)
          await MBadwordList.destroy({
            where: {
              serverID: message.guild.id,
              badword: badword
            }
          })
        }
      }
      // Immune
      if (toggle === 'immune') {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if (!role) {
          const ghostMap = server.immune.map(val => {
            const rl = message.guild.roles.cache.get(val)
            return !rl ? 'Invalid role' : rl.name
          })

          // Inherit dari staff
          const stfList = await GetStaffList(message.guild.id)
          stfList.forEach(val => {
            const rl = message.guild.roles.cache.get(val)
            ghostMap.push(`${!rl ? 'Invalid role' : rl.name} (from Staff)`)
          })
          embed
            .setTitle('Daftar Role Immune')
            .setDescription(
              ghostMap.length > 0 ? ghostMap.join(', ') : 'Masih kosong'
            )
        } else {
          embed.setTitle('Toggle Role Immune')
          const immuneToggle = server.immune.includes(role.id)
          if (!immuneToggle) {
            server.immune.push(role.id)
            embed.setDescription(`Role untuk <@&${role.id}> berhasil ditambahkan ke dalam immune.`)
          } else {
            server.immune.splice(server.immune.indexOf(role.id), 1)
            embed.setDescription(`Role untuk <@&${role.id}> berhasil dihapus ke dalam immune.`)
          }
        }
      }
      // Tidak ada yang sama
      if (!['modify', 'immune'].includes(toggle)) {
        return message.reply('inputan tidak valid!')
      }
    }

    await message.channel.send(`<@!${message.author.id}>`, { embed })
  }
}
