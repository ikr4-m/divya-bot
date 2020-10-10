import { Message } from 'discord.js'
import Client from '../Client'
import Events from '../Events'
import Moment from 'moment'
import MBadwordVictim from '../Models/BadwordVictim'
// import { setTempMute } from '../Module/Moderation/TempMute'

export default class ModerationBadword extends Events {
  constructor() {
    super('message')
  }

  public async run(client: Client, message: Message): Promise<any> {
    if (message.author.id === client.user.id) return
    // if (client.config.owner.includes(message.author.id)) return
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

      await message.reply(
        `kamu diwarn dengan alasan:\n\`\`\`[AutoWarn] Badword ke-${counter}. Tanyakan pada temanmu/staff tentang kesalahanmu di gs!warnlist @mention\`\`\``
      )
    }
  }
}