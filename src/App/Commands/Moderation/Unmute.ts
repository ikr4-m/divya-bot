import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'

export default class Ping extends Command {
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

  public async run(_client: Client, message: Message, _args: string[]): Promise<any> {
    message.channel.send('It works')
  }
}
