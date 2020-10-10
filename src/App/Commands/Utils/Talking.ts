import { Message, TextChannel } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import Yargs from 'yargs-parser'

export default class Talking extends Command {
  constructor() {
    super({
      name: 'talk',
      description: 'Bicara sebagai felice.',
      args: [
        { name: 'channel', type: 'FLAG', require: false },
        { name: 'server', type: 'FLAG', require: false },
        { name: 'text', type: 'BLOCK', require: true }
      ],
      example: 'talk --channel=454637409288847371 --server=454637408479084566 Asdasdasd',
      ownerOnly: true
    })
  }

  public async run(client: Client, message: Message, _args: string[]): Promise<any> {
    const args = Yargs(_args)
    const returnable = { channelID: '', serverID: '', text: args._.join(' ') }
    if (!returnable.text) {
      return client.constant.usage(message, this.options.name, this.options.args)
    }

    returnable.serverID = args.server || message.guild.id
    returnable.channelID = message.mentions.channels.first() || args.channel || message.channel.id

    const server = client.guilds.cache.get(returnable.serverID)
    if (!server) return message.reply('server tidak ditemukan!')

    const channel = server.channels.cache.get(returnable.channelID) as TextChannel
    if (!channel) return message.reply('channel tidak ditemukan!')

    await message.react('👍')
    await channel.send(returnable.text)
  }
}
