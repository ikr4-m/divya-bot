const { Client } = require('@components/DiscordClient') // eslint-disable-line

/**
 * Event Router untuk bot ini.
 */
module.exports = class Router {
  /**
   * @param {Client} client
   */
  constructor (client) {
    this.client = client
  }

  /**
   * Memanggil Events dari folder App/Events
   * @param {string} events Events yang akan dipanggil, referensi:
   * https://discord.js.org/#/docs/main/stable/class/Client
   *
   * @param {string} filename Nama file yang akan dipanggil, ibarat Closure
   * apabila anda pernah menggunakan MVC Framework Adonis/Laravel/CI.
   */
  load (events, filename) {
    const file = require('../App/Events/' + filename)
    this.client.on(events, (...args) => file(this.client, ...args))
  }
}
