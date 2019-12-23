const { Client } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 */
module.exports = (client) => {
  const gameStatus = (value) => `${client.config.bot_prefix}help | ${value}`

  if (process.env.DEV !== 'true') {
    setInterval(() => {
      const rand = Math.floor(Math.random() * client.config.game_presence.length)
      client.user.setPresence(
        { game: { name: gameStatus(client.config.game_presence[rand]) } }
      )
    }, 5000)
  } else {
    client.user.setPresence({ game: { name: gameStatus('DEBUG MODE') } })
  }
}
