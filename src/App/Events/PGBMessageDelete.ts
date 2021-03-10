import Client from '../Client'
import Events from '../Events'
import { Message, MessageEmbed, TextChannel } from 'discord.js'

export default class GSPMessageDelete extends Events {
  constructor() {
    super('messageDelete')
  }

  public async run(client: Client, message: Message): Promise<any> {
    const guildID = '772829810850136074'
    const channelID = '819220193317879838'
    if (message.channel.type !== 'text') return
    if (message.author.bot) return
    if (message.guild.id !== guildID) return

    const guild = client.guilds.cache.get(guildID)
    if (!guild) return
    const channel = guild.channels.cache.get(channelID) as TextChannel
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
