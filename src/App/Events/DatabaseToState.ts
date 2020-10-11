import Client from '../Client'
import Events from '../Events'
import Sequelize from 'sequelize'

// Anti Invite Module
import AntiInviteServer from '../Models/AntiInviteServer'
import AntiInviteImmune from '../Models/AntiInviteImmune'

// Badword List
import BadwordList from '../Models/BadwordList'
import BadwordImmune from '../Models/BadwordImmune'
import BadwordClass from '../Module/Moderation/Badword'

// Register
import RegisterRole from '../Models/RegisterRole'

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

    /**
     * Panggil list badword
     */
    const _bwListServer = await BadwordList.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('serverID')), 'serverID']
      ]
    })
    const bwListServer = _bwListServer.map(val => val.serverID)
    bwListServer.forEach(async serverID => {
      client.state.badword.set(serverID, {
        immune: (await BadwordImmune.findAll({
          where: { serverID }
        })).map(val => val.roleID),
        list: new BadwordClass((await BadwordList.findAll({
          where: { serverID }
        })).map(val => val.badword))
      })
    })

    /**
     * Panggil list register
     */
    RegisterRole.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('serverID')), 'serverID'],
        'roleID'
      ]
    })
      .then(regist => {
        regist.forEach(reg => client.state.register.set(reg.serverID, reg.roleID))
      })
  }
}