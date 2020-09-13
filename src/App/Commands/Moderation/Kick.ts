import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'

export default class Ping extends Command {
  constructor() {
    super({
      name: 'kick',
      description: 'Kick user.',
      args: [
        { name: 'userID|mention', require: true, type: 'BLOCK' },
        { name: 'reason', require: false, type: 'BLOCK' }
      ],
      example: 'kick 709668494563868695 harrass'
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const member = message.mentions.members.first() || await message.guild.members.fetch(args[0])
    const reason = args.slice(1).join(' ')
    const rlReason = !reason || reason.length === 0 ? 'Tidak ada alasan' : reason
    if (!member) return client.constant.usage(message, this.options.name, this.options.args)

    member.kick(`${rlReason} | ${message.author.tag}`)
      .then(() => {
        message.reply('member tersebut berhasil ditendang!')
      })
      .catch(err => {
        message.reply(client.constant.errReason(err))
      })
  }
}
