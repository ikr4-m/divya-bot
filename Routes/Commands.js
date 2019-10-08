module.exports = (client) => {
  require('@scripts/CommandDefaultHandler')(client)
  const Router = new (require('@scripts/CommandRouter'))(client)

  /**
   * Commands
   *
   * Bukan bot namanya kalau tidak ada yang namanya perintah.
   * Kamu bisa mengatur alur command bot ini di dalam file ini.
   *
   * Untuk tata cara penggunaan file ini,
   * baca di README bagian **Waktunya Berurusan dengan Command**.
   */

  Router.group('Core').then(Router => {
    Router.load('Ping', {
      command: ['ping', 'pong'],
      description: 'Pong!'
    })
    Router.load('AvatarUser', {
      command: ['avatar', 'ava'],
      description: 'Cek avatar temanmu di sini.',
      usage: [
        { optional: ['userID', 'userMention'] }
      ]
    })
    Router.load('UserInfo', {
      command: 'userinfo',
      description: 'Informasi tentang member yang dituju/akun sendiri',
      usage: [
        { optional: ['userID', 'userMention'] }
      ]
    })
    Router.load('AboutBot', {
      command: ['aboutbot', 'about'],
      description: 'Tentang bot ini'
    })
  })
}
