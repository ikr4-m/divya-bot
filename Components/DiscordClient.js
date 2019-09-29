const Discord = require('discord.js')

class Client extends Discord.Client {
  /**
   * @param {Discord.ClientOptions} opt
   */
  constructor (opt) {
    super(opt)
    this.reserved = true
  }
}

module.exports = { Client }
module.exports = Discord
