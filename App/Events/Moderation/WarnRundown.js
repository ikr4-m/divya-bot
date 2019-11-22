const { Client } = require('@components/DiscordClient') // eslint-disable-line
const moment = require('moment')

/**
 * @param {Client} client
 */
module.exports = (client) => {
  setInterval(() => {
    const now = moment()
    client.mute.forEach(m => {
      const target = moment(m.timestamp, 'YYYY-MM-DD HH:mm:ss')
      const diff = now.diff(target)

      if (diff > 0) {
        client.mute.delete(`${m.guildID}|${m.memberID}`)
        const guild = client.guilds.get(m.guildID)
        const memTarget = guild.members.get(m.memberID)
        const role = guild.roles.find(r => r.name === 'Muted')

        memTarget.removeRoles([role])
        memTarget.send(`Bungkaman anda telah dilepaskan dari server **${guild.name}**!`)
      }
    })
  }, 500)
}
