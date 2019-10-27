module.exports = (client) => {
  const Router = new (require('@scripts/EventRouter'))(client)

  /**
   * Events
   *
   * Ibarat ruang tunggu dan ruang mendengar, events seperti itu.
   * Ia akan tertrigger/aktif apabila salah satu kondisi memenuhi
   * dari events yang diminta.
   *
   * Events yang tersedia bisa dicek di bawah ini
   * https://discord.js.org/#/docs/main/stable/class/
   */

  Router.load('ready', 'Ready')
  Router.load('ready', 'GameStatus')
  Router.load('ready', 'Moderation/WarnRundown')
}
