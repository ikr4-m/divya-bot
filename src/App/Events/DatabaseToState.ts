import Client from '../Client'
import Events from '../Events'

// Anti Invite Module
import AntiInviteServer from '../Models/AntiInviteServer'
import AntiInviteImmune from '../Models/AntiInviteImmune'

export default class DatabaseToState extends Events {
  constructor() {
    super('ready')
  }

  public async run(client: Client): Promise<any> {
    /**
     * Panggil daftar antiinvite
     */
    AntiInviteServer.findAll()
      .then(_data => {
        _data.forEach(async data => {
          client.state.antiInvite.set(data.serverID, [])
          const roleList = await AntiInviteImmune.findAll({
            where: { serverID: data.serverID }
          })
          roleList.forEach(role => {
            const container = client.state.antiInvite.get(data.serverID)
            if (!container) return
            container.push(role.roleID)
          })
        })
      })
  }
}