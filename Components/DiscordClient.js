const Discord = require('discord.js')
const Config = require('../config.json')
const Console = require('./Console')
const strFormat = require('string-format')
const MongoAdapter = require('./Database/Scripts/Adapter')
const MongoController = require('./Database/Scripts/Controller')

class Client extends Discord.Client {
  /**
   * @param {Discord.ClientOptions} opt
   */
  constructor (opt) {
    super(opt)
    /**
     * Konfigurasi dari bot ini
     * @type {ConfigBot}
     * @typedef ConfigBot
     * @property {string} bot_name Nama bot
     * @property {string} bot_prefix Prefix bot
     * @property {string} color Warna default embed dari bot ini
     * @property {string[]} maintener Maintener untuk bot ini
     * @property {string[]} game_presence Game presence untuk bot ini.
     */
    this.config = Config
    /**
     * Shorthand untuk panggil Console
     */
    this.console = Console
    /**
     * Isi dari seluruh command dari bot ini
     * @type {Discord.Collection<string, CommandList>}
     */
    this.commands = new Discord.Collection()
    /**
     * Prefix lain dari command yang telah terdaftar
     * @type {Discord.Collection<string, string>}
     */
    this.aliases = new Discord.Collection()
    /**
     * Daftar Help lengkap dengan penggolongannya
     * @type {Discord.Collection<string, string[]>}
     */
    this.helps = new Discord.Collection()
    /**
     * Penggunaan dari sebuah command
     * @param {string} denial Denial dari command tersebut.
     */
    this.usage = function (denial) {
      const usage = this.commands.filter(c => c.denial === denial).first().usage
      return strFormat(`cara penggunaan yang benar adalah:\`\`\`${usage}\`\`\``, {
        prefix: this.config.bot_prefix
      })
    }
    this._conDB = new MongoAdapter(process.env.MONGODB_URL, {}).connect()
    /**
     * Database ke server
     */
    this.database = (model) => {
      const controller = new (MongoController(model))()
      return controller
    }
    /**
     * Daftar mute
     * @type {Discord.Collection<string, WarnList>}
     */
    this.mute = new Discord.Collection()
    /**
     * Timestamp saat bot ini jalan
     * @type {Date}
     */
    this.uptimeDate = new Date()
  }
}

// Defenisi yang diperlukan untuk discord, ketik di sini
/**
 * @type {Discord.Message}
 */
var Message

module.exports = { Client, Message }

/**
 * Isi perintah dari command
 * @typedef CommandList
 * @property {string | string[]} command Dipanggil apa command tersebut dalam chat.
 * @property {string} denial Denial command dalam sistem.
 * @property {string} description Deskripsi dari command tersebut/
 * @property {string | UsageConstructor[]} [usage] Cara penggunaan dari command tersebut.
 * @property {boolean} [moderating] Beri nilai true apabila command tersebut adalah moderation/
 * @property {import('discord.js').PermissionResolvable[]} [permission] Permission apa aja yang bisa dipakai oleh command ini
 * @property {number} [cooldown] Cooldown dari command anda, defaultnya adalah 5.
 * @property {any} run Jalankan perintahnya
 */

/**
 * Callback untuk usage
 * @typedef UsageConstructor
 * @property {string[]} [optional] Opsional
 * @property {string[]} [require] Yang diperlukan
 */

/**
 * Isi data untuk warn
 * @typedef WarnList
 * @property {string} reason Alasan kenapa mesti dimute
 * @property {string} timestamp Kapan kena mute?
 * @property {string} guildID
 * @property {string} memberID
 * @property {string} [forever]
 */
