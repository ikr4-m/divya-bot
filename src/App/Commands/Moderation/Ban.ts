import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import { ifStaff as IfStaff } from '../../Module/Moderation/StaffList'

export default class Ban extends Command {
  constructor() {
    super({
      name: 'ban',
      description: 'Ban user.',
      args: [
        { name: 'userID|mention', require: true, type: 'BLOCK' },
        { name: 'reason', require: false, type: 'BLOCK' }
      ],
      example: 'ban 709668494563868695 harrass'
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const momod = await message.guild.members.fetch(message.author.id)
    const reason = args.slice(1).join(' ')
    const rlReason = !reason || reason.length === 0 ? 'Tidak ada alasan' : reason
    if (!member || !momod) return client.constant.usage(message, this.options.name, this.options.args)

    const ifStaff = await IfStaff(momod)
    if (!ifStaff) {
      if (!momod.hasPermission('ADMINISTRATOR')) {
        return message.reply('anda tidak memiliki ijin untuk menggunakan command ini!')
      }
    }

    const ifMemberStaff = await IfStaff(member)
    if (ifMemberStaff || member.hasPermission('ADMINISTRATOR')) return message.reply('anda tidak bisa memalu staff.')

    await member.createDM()
      .then(memberCH => {
        memberCH.send(`Anda telah dipalu dari ${message.guild.name} dengan alasan:\n\`\`\`${reason}\`\`\``)
      })
      .catch(_err => {
        // Do fucking nothing
      })

    await member.ban({ reason: `${rlReason} | ${message.author.tag}` })
      .then(() => {
        message.reply(`member tersebut berhasil dipalu dengan alasan:\n\`\`\`${rlReason}\`\`\``)
      })
      .catch(err => {
        message.reply(client.constant.errReason(err))
      })
  }
}
