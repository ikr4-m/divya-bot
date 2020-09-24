import { Message, MessageEmbed } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import MWarnList from '../../Models/WarnList'
import Moment from 'moment'

export default class Ping extends Command {
  constructor() {
    super({
      name: 'warnlist',
      description: 'Daftar warn member.',
      args: [
        { name: 'userID|mention', require: false, type: 'BLOCK' }
      ],
      example: 'warnlist 709668494563868695'
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const _member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
    const member = message.guild.members.cache.get(_member.id)

    const WarnList = await MWarnList.findAll({
      where: { serverID: message.guild.id, memberID: member.id }
    })

    const embed = new MessageEmbed()
      .setColor(client.config.botColor)
      .setTimestamp()
      .setFooter(`Diminta oleh ${message.author.tag}`)
      .setTitle(`Daftar Warn untuk ${member.user.tag}`)
    let retStr = ''
    let count = 1
    WarnList.forEach(wlist => {
      retStr += `${count}. ${wlist.reason} | <@!${wlist.staffID}> [${Moment(wlist.dateExecuted).utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss')} WITA]\n`
    })
    embed.setDescription(retStr.length === 0 ? 'Masih kosong' : retStr)

    await message.channel.send(`<@!${message.author.id}>`, { embed })
  }
}
