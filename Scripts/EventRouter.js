const { Client } = require('@components/DiscordClient') // eslint-disable-line
const fs = require('fs')
const path = require('path')

/**
 * Event Router untuk bot ini.
 */
module.exports = class Router {
  /**
   * @param {Client} client
   */
  constructor (client, lastGroup) {
    this.client = client
    this.lastGroup = lastGroup
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
    filename = typeof this.lastGroup === 'undefined'
      ? filename
      : `${this.lastGroup}/${filename}`

    const filePath = path.resolve('./App/Events/', filename + '.js')
    if (fs.existsSync(filePath)) {
      const file = require('../App/Events/' + filename)
      this.client.on(events, (...args) => file(this.client, ...args))
      this.client.console.info(`Loaded Events [${filename}]`)
    } else {
      throw new Error('Event not found in: ' + filePath)
    }
  }

  /**
   * Menggabungkan event dalam satu grup
   * @param {string} prefix Prefix untuk groupnya, sebagai penanda
   * nama folder dalam App/Events/
   * @return {Promise<Router>} Load datanya seperti biasa
   */
  group (prefix) {
    return new Promise((resolve) => {
      prefix = typeof this.lastGroup === 'undefined'
        ? prefix
        : `${this.lastGroup}/${prefix}`
      resolve(new Router(this.client, prefix))
    })
  }
}
