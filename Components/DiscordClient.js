const Discord = require('discord.js')
const Config = require('../config.json')
const Console = require('./Console')

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
     * @property {string[]} beta_test Beta Tester untuk bot ini
     */
    this.config = Config
    /**
     * Shorthand untuk panggil Console
     */
    this.console = Console
    /**
     * Isi dari seluruh command dari bot ini
     * @type {Discord.Collection<string, CommandList>}
     * @typedef CommandList
     * @property {string | string[]} command Dipanggil apa command tersebut dalam chat
     * @property {string} description Deskripsi dari command tersebut
     * @property {string} usage Cara penggunaan dari command tersebut
     * @property {number} [cooldown] Cooldown dari command anda, defaultnya adalah 5.
     * @property {any} run Jalankan perintahnya
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
  }
}

// Defenisi yang diperlukan untuk discord, ketik di sini
/**
 * @type {Discord.Message}
 */
var Message

module.exports = { Client, Message }
