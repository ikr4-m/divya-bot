const { Client } = require('@components/DiscordClient') // eslint-disable-line

/**
 * Events yang akan diluncurkan
 * @typedef {Object} TypeDefEvents
 * @property {string} filename Filename Events yang akan dipanggil
 * @property {string} events Tipe events yang akan digunakan
 */

/**
 * Inisiator events untuk bot ini.
 * @param {Client} client Client Discord
 * @param {TypeDefEvents[]} events Events yang ingin diluncurkan
 */
module.exports = function Router (client, events) {
  events.forEach(event => {
    const file = require('../App/Events/' + event.filename)
    client.on(event.events, (...args) => file(client, ...args))
  })
}
