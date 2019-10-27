const { Client } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 */
module.exports = (client) => {
  setTimeout(() => {
    console.log('Mustofa jelek')
  }, 5000)
}
