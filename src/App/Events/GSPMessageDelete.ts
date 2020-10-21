import Client from '../Client'
import Events from '../Events'
import { Message, MessageEmbed, TextChannel } from 'discord.js'

export default class GSPMessageDelete extends Events {
  constructor() {
    super('messageDelete')
  }

  public async run(client: Client, message: Message): Promise<any> {
    if (message.channel.type !== 'text') return
    if (message.author.bot) return
    if (message.guild.id !== '302655971946135554') return

    const guild = client.guilds.cache.get('302655971946135554')
    if (!guild) return
    const channel = guild.channels.cache.get('714821103360409631') as TextChannel
    if (!channel) return
    if (channel.type !== 'text') return

    const embed = new MessageEmbed()
      .setAuthor(`${message.author.tag} [${message.author.id}]`, message.author.displayAvatarURL())
      .addField('Channel', `<#${message.channel.id}>`, false)
      .addField('Content', message.content.length > 0 ? message.content : 'Tidak ada konten', false)
      .setTimestamp()

    const mentioned = []
    message.mentions.members.forEach(men => mentioned.push(`<@!${men.id}>`))
    message.mentions.roles.forEach(men => mentioned.push(`<@&${men.id}>`))

    channel.send(mentioned.length > 0 ? `Mentioned: ${mentioned.join(' | ')}` : '', { embed })
  }
}
