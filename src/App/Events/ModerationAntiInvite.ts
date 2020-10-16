import { Message } from 'discord.js'
import Client from '../Client'
import Events from '../Events'
import { setTempMute } from '../Module/Moderation/TempMute'
import { ifStaff } from '../Module/Moderation/StaffList'

export default class ModerationAntiInvite extends Events {
  constructor() {
    super('message')
  }

  public async run(client: Client, message: Message): Promise<any> {
    if (message.channel.type !== 'text') return
    if (message.author.bot) return

    const executor = await message.guild.members.fetch(message.author.id)
    if (!executor) return
    const server = client.state.antiInvite.get(message.guild.id)
    if (!server) return

    let ifImmune = false
    server.forEach(se => {
      if (executor.roles.cache.has(se)) ifImmune = true
    })
    if (ifImmune) return
    if (executor.permissions.has('ADMINISTRATOR')) return

    // Staff Bypass
    if (await ifStaff(executor)) return

    const content = message.content
    const matcher = content.match(
      /(https?:\/\/)?(http?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/igm // eslint-disable-line
    )
    if (matcher) {
      const _role = message.guild.roles.cache.filter(r => r.name === 'Muted')
      if (_role.size > 0) {
        const role = _role.first()
        await setTempMute(client, executor, role, '2h', 'Server advertisment')
      }

      await message.delete()
      await message.reply(
        'anda telah dibungkam selama 2 jam dengan alasan:\n```[AutoWarn] Tidak boleh promosi server Discord di sini!```'
      )
    }
  }
}