import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import Moment from 'moment'
import MWarnList from '../../Models/WarnList'
import { ifStaff as IfStaff } from '../../Module/Moderation/StaffList'
import { setTempMute } from '../../Module/Moderation/TempMute'

export default class Warn extends Command {
  constructor() {
    super({
      name: 'warn',
      description: 'Beri peringatan kepada user.',
      args: [
        { name: 'userID|mention', require: true, type: 'BLOCK' },
        { name: 'reason', require: false, type: 'BLOCK' }
      ],
      example: 'warn 709668494563868695 harrass'
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

    // Ambil role mute
    const muteRole = message.guild.roles.cache.filter(r => r.name === 'Muted').first()
    if (!muteRole) return message.reply('tidak ada role yang bernama **Muted**.')

    // Dapatkan list
    const warnList = await MWarnList.findAll({ where: { serverID: member.guild.id, memberID: member.id } })
    const counting = warnList.length + 1
    let res = `<@!${member.id}> berhasil diwarn dengan alasan:\n\`\`\`${rlReason}\`\`\``

    // Selain staff, anda tidak mendapatkan warn apapun itu
    if (!await IfStaff(member) && !member.hasPermission('ADMINISTRATOR')) {
      res = `<@!${member.id}> berhasil diwarn untuk ke-${counting} dengan alasan:\n\`\`\`${rlReason}\`\`\``
      await MWarnList.create({
        serverID: member.guild.id,
        memberID: member.id,
        reason: rlReason,
        staffID: momod.id,
        dateExecuted: Moment().format()
      })

      switch (counting) {
        // Mute 3 jam
        case 3:
          setTempMute(client, member, muteRole, '3h', rlReason).then(victim => {
              message.channel.send(`3x Warn berlalu. <@!${member.id}> berhasil dibungkam selama ${victim.intTime} ${victim.prettyTime}.`)
            })
          break
        // Mute 1 hari
        case 4:
          setTempMute(client, member, muteRole, '1d', rlReason).then(victim => {
              message.channel.send(`4x Warn berlalu. <@!${member.id}> berhasil dibungkam selama ${victim.intTime} ${victim.prettyTime}.`)
            })
          break
        // Kick
        case 5:
          await member.createDM()
            .then(memberCH => {
              memberCH.send(`Anda telah ditendang dari ${message.guild.name} dikarenakan 5x Warn berlalu dengan alasan:\n\`\`\`${reason}\`\`\``)
            })
            .catch(_err => {
              // Do fucking nothing
            })
          await member.kick(`${rlReason} | ${message.author.tag}`)
            .then(_mem => {
              message.channel.send(`5x Warn berlalu. <@!${member.id}> berhasil ditendang!`)
            })
          break
        // Ban, masih banding
        case 7:
          await member.createDM()
            .then(memberCH => {
              memberCH.send(
                `Anda telah dipalu dari ${message.guild.name} dikarenakan 7x Warn berlalu dengan alasan:\n\`\`\`${reason}\`\`\`\nKamu bisa memberi banding kepada staff yang memalu dirimu.`
              )
            })
            .catch(_err => {
              // Do fucking nothing
            })
          await member.ban({ reason: `${rlReason} | ${message.author.tag}` })
            .then(() => {
              message.channel.send(`7x Warn berlalu. <@!${member.id}> berhasil dipalu! Masih bisa banding kok!`)
            })
          break
        // Ban perm
        case 9:
          await member.createDM()
            .then(memberCH => {
              memberCH.send(
                `Anda telah dipalu permanen dari ${message.guild.name} dikarenakan 9x Warn berlalu dengan alasan:\n\`\`\`${reason}\`\`\`\n`
              )
            })
            .catch(_err => {
              // Do fucking nothing
            })
          await member.ban({ reason: `${rlReason} | ${message.author.tag}` })
            .then(() => {
              message.channel.send(`9x Warn berlalu. <@!${member.id}> berhasil dipalu dengan permanen!`)
            })
          break
      }
    }

    await message.reply(res)
  }
}
