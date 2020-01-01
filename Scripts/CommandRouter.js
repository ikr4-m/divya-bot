const { Client } = require('@components/DiscordClient') // eslint-disable-line
const fs = require('fs')
const cmdUsage = require('./CommandUsage')

/**
 * Command Router untuk bot ini.
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
   * Panggil file command.
   * @param {string} file Nama file yang akan dipanggil, ibarat Closure
   * apabila anda pernah menggunakan MVC Framework Adonis/Laravel/CI.
   * @param {import('../Components/DiscordClient').CommandList} config Konfigurasi untuk command file ini
   */
  load (file, config) {
    file = typeof this.lastGroup === 'undefined'
      ? file
      : `${this.lastGroup}/${file}`

    // Apabila commandnya tidak ada
    if (!fs.existsSync('./App/Command/' + file + '.js')) {
      throw new Error(`File not found in App/Command/${file}.js`)
    }

    // Untuk membedakan array atau string di commandnya
    const cmd = typeof config.command === 'string'
      ? config.command
      : config.command[0]

    // Buat object untuk simpan datanya di Collection
    const insertation = {
      command: config.command,
      description: config.description,
      usage: typeof config.usage === 'undefined' ? `{prefix}${cmd}` : cmdUsage(config.usage, cmd),
      run: require('../App/Command/' + file),
      denial: file.split('/').join('::'),
      moderating: typeof config.moderating === 'boolean' ? true : false, // eslint-disable-line
      cooldown: typeof config.cooldown === 'undefined' ? 5 : config.cooldown,
      permission: config.permission || []
    }
    if (typeof config.cooldown !== 'undefined') {
      insertation.cooldown = config.cooldown
    }

    // Simpan commandnya di client
    this.client.commands.set(cmd, insertation)

    // Simpan ke help
    const fileSplit = file.split('/'); fileSplit.pop()
    const cateName = fileSplit.length > 0
      ? fileSplit[0]
      : fileSplit.join('::')

    if (!this.client.helps.has(cateName)) {
      this.client.helps.set(cateName, [])
      this.client.helps.get(cateName).push(cateName)
    }
    this.client.helps.get(cateName).push(cmd)
    this.client.console.info(`Loaded command [${file.split('/').join('::')}]`)

    // Simpan ke alias apabila commandnya adalah array
    if (typeof config.command !== 'string') {
      const alias = config.command.slice(1)
      alias.forEach(a => this.client.aliases.set(a, cmd))
    }
  }

  /**
   * Menggabungkan perintah dalam satu grup
   * @param {string} prefix Prefix untuk groupnya, sebagai penanda
   * nama folder dalam App/Command/
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

/**
  * Callback untuk load
  * @callback LoadCommandCallback
  * @param {string} file Nama filenya
  * @param {CommandFileConfiguration} config Konfigurasi untuk command file ini
  * @return {void}
  */
