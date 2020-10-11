import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'

export default class SetGamePresence extends Command {
  constructor() {
    super({
      name: 'setpresence',
      description: 'Set presence.',
      args: [
        { name: 'message', type: 'BLOCK', require: false }
      ],
      example: 'setpresence Halo semua',
      ownerOnly: true
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const msg = args.join(' ')
    if (!msg) {
      client.state.presence.status = true
      message.reply('presence successfully reset!')
    } else {
      client.state.presence.status = false
      client.user.setPresence({
        activity: {
          name: msg,
          type: 'PLAYING'
        }
      })
      message.reply('presence has been successfully set!')
    }
  }
}
