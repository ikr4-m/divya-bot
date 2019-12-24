const { Client } = require('@components/DiscordClient') // eslint-disable-line
const moment = require('moment')

/**
 * @param {Client} client
 */
module.exports = (client) => {
  setInterval(() => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('./Components/Database/mute.json')
    const db = low(adapter)
    const now = moment()
    const val = db.value()
    const keys = Object.keys(val)
    keys.forEach(_m => {
      const m = val[_m]
      const target = moment(m.timestamp, 'YYYY-MM-DD HH:mm:ss')
      const diff = now.diff(target)

      if (diff > 0 && typeof m.forever === 'undefined') {
        db.unset(`${m.guildID}|${m.memberID}`).write()
        const guild = client.guilds.get(m.guildID)
        const memTarget = guild.members.get(m.memberID)
        const role = guild.roles.find(r => r.name === 'Muted')

        memTarget.removeRoles([role])
        memTarget.send(`Bungkaman anda telah dilepaskan dari server **${guild.name}**!`)
      }
    })
  }, 500)
}
