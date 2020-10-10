import { Message, MessageEmbed } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import AntiInviteServer from '../../Models/AntiInviteServer'
import AntiInviteImmune from '../../Models/AntiInviteImmune'
import { GetStaffList } from '../../Module/Moderation/StaffList'

export default class AntiInvite extends Command {
  constructor() {
    super({
      name: 'antiinvite',
      description: 'Kelola anti invite di server ini.',
      args: [
        { name: 'toggle|immune', require: false, type: 'BLOCK' },
        { name: 'immune=roleID|roleMention', require: false, type: 'BLOCK' }
      ],
      example: 'antiinvite toggle'
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

    const toggle = args[0] as 'toggle' | 'immune'
    const getState = client.state.antiInvite.has(message.guild.id)
    if (!toggle) {
      embed
        .setTitle('Status Anti Invite')
        .setDescription(
          `Anda ${!getState ? 'belum' : 'sudah'} menyalakan anti invite di server ini.`
        )
    } else {
      // Mati/nyala
      if (toggle === 'toggle') {
        embed.setTitle('Toggle Anti Invite')
        if (!getState) {
          client.state.antiInvite.set(message.guild.id, [])
          embed.setDescription('Anti invite berhasil diaktifkan!')
          await AntiInviteServer.create({
            serverID: message.guild.id
          })
        } else {
          client.state.antiInvite.delete(message.guild.id)
          embed.setDescription('Anti invite berhasil dinonaktifkan!')
          await AntiInviteServer.destroy({
            where: { serverID: message.guild.id }
          })
        }
      }
      // Immune
      if (toggle === 'immune') {
        const server = client.state.antiInvite.get(message.guild.id)
        if (!server) return message.reply('anti invite di server ini belum dinyalakan!')
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

        if (!role) {
          const ghostMap = server.map(val => {
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
          const immuneToggle = server.includes(role.id)
          if (!immuneToggle) {
            server.push(role.id)
            embed.setDescription(`Role untuk <@&${role.id}> berhasil ditambahkan ke dalam immune.`)
            await AntiInviteImmune.create({
              serverID: message.guild.id,
              roleID: role.id
            })
          } else {
            server.splice(server.indexOf(message.guild.id), 1)
            embed.setDescription(`Role untuk <@&${role.id}> berhasil dihapus ke dalam immune.`)
            await AntiInviteImmune.destroy({
              where: {
                serverID: message.guild.id,
                roleID: role.id
              }
            })
          }
        }
      }
      // Tidak ada yang sama
      if (!['toggle', 'immune'].includes(toggle)) {
        return message.reply('inputan tidak valid!')
      }
    }

    await message.channel.send(`<@!${message.author.id}>`, { embed })
  }
}
