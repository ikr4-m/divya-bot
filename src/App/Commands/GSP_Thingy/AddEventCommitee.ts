import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import { ifStaff as IfStaff } from '../../Module/Moderation/StaffList'
import MEvtCom from '../../Models/EventCommiteeGSP'

export default class AddEventCommitee extends Command {
  constructor() {
    super({
      name: 'gspec',
      description: 'Tambah/kurang event commitee.',
      args: [
        { name: 'add|remove', require: true, type: 'BLOCK' }
      ],
      example: 'gspec add 644367677665837056'
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const mode = args[0].toLowerCase()
    const roleID = args[1]
    const executor = await message.guild.members.fetch(message.author.id)
    if ((!mode || !roleID) || !['add', 'remove'].includes(mode)) return client.constant.usage(message, this.options.name, this.options.args)

    const ifStaff = await IfStaff(executor)
    if (!ifStaff) {
      if (!executor.hasPermission('ADMINISTRATOR')) {
        return message.reply('anda tidak memiliki ijin untuk menggunakan command ini!')
      }
    }

    const role = await message.guild.roles.fetch(roleID)
    if (!role) return message.reply('role tidak ditemukan!')

    if (mode === 'add') {
      MEvtCom
        .findOne({ where: { serverID: message.guild.id, roleID: roleID } })
        .then(async data => {
          data
            ? await data.update({ serverID: message.guild.id, roleID: roleID })
            : await MEvtCom.create({ serverID: message.guild.id, roleID: roleID })
          await message.reply(`<@&${roleID}> berhasil ditambahkan!`)
        })
        .catch(err => {
          message.reply(client.constant.errReason(err))
        })
    }
    if (mode === 'remove') {
      MEvtCom.destroy({
        where: { serverID: message.guild.id, roleID: roleID }
      })
        .then(() => {
          message.reply(`<@&${roleID}> berhasil dihapus!`)
        })
        .catch(err => {
          message.reply(client.constant.errReason(err))
        })
    }
  }
}
