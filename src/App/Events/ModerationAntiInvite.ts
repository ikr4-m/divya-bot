import { Message } from 'discord.js'
import Client from '../Client'
import Events from '../Events'
import { setTempMute } from '../Module/Moderation/TempMute'

export default class Debug extends Events {
  constructor() {
    super('message')
  }

  public async run(client: Client, message: Message): Promise<any> {
    const executor = message.guild.members.cache.get(message.author.id)
    if (!executor) return
    const server = client.state.antiInvite.get(message.guild.id)
    if (!server) return

    let ifImmune = false
    server.forEach(se => {
      if (executor.roles.cache.has(se)) ifImmune = true
    })
    if (ifImmune) return
    if (executor.permissions.has('ADMINISTRATOR')) return

    const content = message.content
    const matcher = content.match(
      /discord(?:\.com|app\.com|\.gg|\.io|\.me|\.li)[\/invite\/]?(?:[a-zA-Z0-9\-]{2,32})/igm
    ).length > 0
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