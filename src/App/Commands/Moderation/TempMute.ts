import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import { ifStaff as IfStaff } from '../../Module/Moderation/StaffList'
import { isTimeValid, setTempMute } from '../../Module/Moderation/TempMute'

export default class TempMute extends Command {
  constructor() {
    super({
      name: ['tempmute', 'tmute'],
      description: 'Mute user dalam waktu yang ditentukan.',
      args: [
        { name: 'userID|mention', require: true, type: 'BLOCK' },
        { name: 'xd|xh|xm|xs', require: true, type: 'BLOCK' },
        { name: 'reason', require: false, type: 'BLOCK' }
      ],
      example: 'mute 709668494563868695 3h harrass'
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const momod = await message.guild.members.fetch(message.author.id)
    const reason = args.slice(2).join(' ')
    const plainTime = args[1]
    const rlReason = !reason || reason.length === 0 ? 'Tidak ada alasan' : reason
    if (!member || !momod) return client.constant.usage(message, this.options.name, this.options.args)

    const ifStaff = await IfStaff(momod)
    if (!ifStaff) {
      if (!momod.hasPermission('ADMINISTRATOR')) {
        return message.reply('anda tidak memiliki ijin untuk menggunakan command ini!')
      }
    }

    const mutedRole = message.guild.roles.cache.filter(r => r.name === 'Muted').first()
    if (!mutedRole) return message.reply('tidak ada role yang bernama **Muted**.')
    if (!isTimeValid(plainTime)) return message.reply('waktu yang anda berikan tidak valid.')

    setTempMute(client, member, mutedRole, plainTime, rlReason)
      .then(res => {
        if (res) message.reply(
          `<@!${member.id}> berhasil dibungkam selama ${res.intTime} ${res.prettyTime} dengan alasan:\`\`\`${rlReason}\`\`\``
        )
      })
      .catch(err => {
        message.reply(client.constant.errReason(err))
      })
  }
}
