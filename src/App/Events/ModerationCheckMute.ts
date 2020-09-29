import Client from '../Client'
import Events from '../Events'
import MTempMute from '../Models/TempMute'
import Moment from 'moment'

export default class ModerationCheckMute extends Events {
  constructor() {
    super('ready')
  }

  public async run(client: Client): Promise<any> {
    setInterval(async () => {
      client.state.tempMute.forEach(async (value, key) => {
        const now = Moment()
        const keys = key.split(':')
        const serverID = keys[0]
        const memberID = keys[1]

        const guild = client.guilds.cache.filter(g => g.id === serverID).first()
        if (!guild) return
        const member = guild.members.cache.filter(m => m.id === memberID).first()
        if (!member) return
        const role = guild.roles.cache.filter(r => r.name === 'Muted').first()
        if (!role) return

        if (now.diff(value, 's') > 0) {
          if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role)
          }
          await MTempMute.update({ executed: true }, {
            where: { serverID, memberID, executed: false }
          })
          client.state.tempMute.delete(key)
        }
      })
    }, 1000);
  }
}