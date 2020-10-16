import { Message } from 'discord.js'
import Client from '../Client'
import Events from '../Events'
import Moment from 'moment'
import MBadwordVictim from '../Models/BadwordVictim'
import { ifStaff } from '../Module/Moderation/StaffList'
import { setTempMute } from '../Module/Moderation/TempMute'

export default class ModerationBadword extends Events {
  constructor() {
    super('message')
  }

  public async run(client: Client, message: Message): Promise<any> {
    if (message.channel.type !== 'text') return
    if (message.author.bot) return

    if (message.author.id === client.user.id) return
    if (client.config.owner.includes(message.author.id)) return
    const executor = await message.guild.members.fetch(message.author.id)
    if (!executor) return
    const server = client.state.badword.get(message.guild.id)
    if (!server) return

    let ifImmune = false
    server.immune.forEach(se => {
      if (executor.roles.cache.has(se)) ifImmune = true
    })
    if (ifImmune) return
    if (executor.permissions.has('ADMINISTRATOR')) return

    // Staff Bypass
    if (await ifStaff(executor)) return

    const matcher = server.list.getBadword(message.content)
    if (matcher.length > 0) {
      await message.delete()

      await MBadwordVictim.create({
        serverID: message.guild.id,
        channelID: message.channel.id,
        memberID: message.author.id,
        badword: matcher.join(' | '),
        timestamp: Moment().format()
      })
      const _counter = await MBadwordVictim.findAll({
        where: {
          serverID: message.guild.id,
          channelID: message.channel.id,
          memberID: message.author.id
        }
      })
      const counter = _counter.length

      // Counting mute
      const role = message.guild.roles.cache.filter(r => r.name === 'Muted').first()
      if (!role) return
      switch (counter) {
        case 3:
          setTempMute(client, executor, role, '1h', 'Badword')
            .then(res => {
              if (res) message.reply(
                `<@!${executor.id}> berhasil dibungkam selama ${res.intTime} ${res.prettyTime} dengan alasan:\`\`\`[AutoWarn] Badword\`\`\``
              )
            })
            .catch(err => {
              message.reply(client.constant.errReason(err))
            })
          break
        case 5:
          setTempMute(client, executor, role, '5h', 'Badword')
            .then(res => {
              if (res) message.reply(
                `<@!${executor.id}> berhasil dibungkam selama ${res.intTime} ${res.prettyTime} dengan alasan:\`\`\`[AutoWarn] Badword\`\`\``
              )
            })
            .catch(err => {
              message.reply(client.constant.errReason(err))
            })
          break
        case 7:
          setTempMute(client, executor, role, '12h', 'Badword')
            .then(res => {
              if (res) message.reply(
                `<@!${executor.id}> berhasil dibungkam selama ${res.intTime} ${res.prettyTime} dengan alasan:\`\`\`[AutoWarn] Badword\`\`\``
              )
            })
            .catch(err => {
              message.reply(client.constant.errReason(err))
            })
          break
        case 9:
          setTempMute(client, executor, role, '1d', 'Badword')
            .then(res => {
              if (res) message.reply(
                `<@!${executor.id}> berhasil dibungkam selama ${res.intTime} ${res.prettyTime} dengan alasan:\`\`\`[AutoWarn] Badword\`\`\``
              )
            })
            .catch(err => {
              message.reply(client.constant.errReason(err))
            })
          break
        case 10:
          setTempMute(client, executor, role, '3d', 'Badword')
            .then(res => {
              if (res) message.reply(
                `<@!${executor.id}> berhasil dibungkam selama ${res.intTime} ${res.prettyTime} dengan alasan:\`\`\`[AutoWarn] Badword\`\`\``
              )
            })
            .catch(err => {
              message.reply(client.constant.errReason(err))
            })
          break
      }

      await message.reply(
        `kamu diwarn dengan alasan:\n\`\`\`[AutoWarn] Badword ke-${counter}. Tanyakan pada temanmu/staff tentang kesalahanmu di gs!warnlist @mention\`\`\``
      )
    }
  }
}