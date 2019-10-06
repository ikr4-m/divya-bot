const { Client } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 */
module.exports = (client) => {
  const gameStatus = (value) => `${client.config.bot_prefix} | ${value}`

  if (process.env.DEV !== 'true') {
    client.config.game_presence.forEach(game => {
      client.user.setPresence({ game: { name: gameStatus(game) } })
    })
  } else {
    client.user.setPresence({ game: { name: gameStatus('DEBUG MODE') } })
  }
}
