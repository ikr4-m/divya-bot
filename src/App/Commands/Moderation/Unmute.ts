import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import MTempMute from '../../Models/TempMute'
import { ifStaff as IfStaff } from '../../Module/Moderation/StaffList'

export default class Unmute extends Command {
  constructor() {
    super({
      name: 'unmute',
      description: 'Unmute user.',
      args: [
        { name: 'userID|mention', require: true, type: 'BLOCK' }
      ],
      example: 'unmute 709668494563868695'
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const momod = await message.guild.members.fetch(message.author.id)
    if (!member || !momod) return client.constant.usage(message, this.options.name, this.options.args)

    const ifStaff = await IfStaff(momod)
    if (!ifStaff) {
      if (!momod.hasPermission('ADMINISTRATOR')) {
        return message.reply('anda tidak memiliki ijin untuk menggunakan command ini!')
      }
    }

    const mutedRole = message.guild.roles.cache.filter(r => r.name === 'Muted').first()
    if (!mutedRole) return message.reply('tidak ada role yang bernama **Muted**.')

    await member.roles.remove(mutedRole)

    const keyTempMute = `${member.guild.id}:${member.id}`
    if (client.state.tempMute.has(keyTempMute)) {
      await MTempMute.update({ executed: true }, {
        where: { serverID: member.guild.id, memberID: member.id }
      })
      
      client.state.tempMute.delete(keyTempMute)
    }

    await message.reply(`bungkaman untuk <@!${member.id}> telah dilepas!`)
  }
}
