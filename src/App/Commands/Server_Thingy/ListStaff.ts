import { Message, MessageEmbed } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import MStaffList from '../../Models/StaffList'

export default class ListStaff extends Command {
  constructor() {
    super({
      name: 'liststaff',
      description: 'Daftar role staff di server ini.'
    })
  }

  public async run(client: Client, message: Message, _args: string[]): Promise<any> {
    const guildID = message.guild.id
    const data = await MStaffList.findAll({ where: { serverID: guildID } })

    let count = 1
    const returningData = []
    data.forEach(da => {
      returningData.push(`${count}. <@&${da.roleID}>`)
      count++
    })

    const embed = new MessageEmbed()
      .setColor(client.config.botColor)
      .setTitle('Daftar Role Staff')
      .setFooter(`Diminta oleh ${message.author.tag}`, message.author.displayAvatarURL())
      .setTimestamp()
      .setDescription(returningData.length > 0 ? returningData.join('\n') : 'Tidak ada role.')

    await message.channel.send(`<@!${message.author.id}>`, { embed: embed })
  }
}
