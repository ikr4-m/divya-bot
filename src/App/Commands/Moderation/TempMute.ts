import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'

export default class Ping extends Command {
  constructor() {
    super({
      name: ['tempmute', 'tmute'],
      description: 'Mute user dalam waktu yang ditentukan.',
      args: [
        { name: 'userID|mention', require: true, type: 'BLOCK' },
        { name: 'duration', require: true, type: 'BLOCK' },
        { name: 'reason', require: false, type: 'BLOCK' }
      ],
      example: 'mute 709668494563868695 3h harrass'
    })
  }

  public async run(_client: Client, message: Message, _args: string[]): Promise<any> {
    message.channel.send('It works')
  }
}
