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

  /**
   * Maintener Group
   * Tolong, untuk pada pengembang,
   * **jangan mengubah apapun command di bagian ini**.
   */
  Router.group('Maintener').then(Router => {
    Router.load('EvaluationCode', {
      command: ['eval', 'run'],
      description: 'Jalankan perintah nyeleneh dari bot ini.',
      moderating: true,
      usage: [
        { require: ['blockCode'] }
      ]
    })
  })

  /**
   * Core Group
   * Segala hal yang berkaitan dengan Discord dan Bot
   * tanpa ada perantara.
   *
   * Disarankan untuk tidak mengubah apapun selain ijin dari
   * maintener bot.
   */
  Router.group('Core').then(Router => {
    Router.load('HelpCommand', {
      command: ['help', '?'],
      description: 'Bingung make bot ini? Di sini tempatnya!',
      usage: [
        { optional: ['command'] }
      ]
    })
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
      description: 'Tentang bot dan server ini'
    })
    Router.load('Uptime', {
      command: 'uptime',
      description: 'Sudah berapa lama bot ini begadang?'
    })
  })

  /**
   * Moderating Bot
   * Kang pukul punya kekuasaan di sini.
   */
  Router.group('Moderation').then(Router => {
    Router.load('Kick', {
      command: 'kick',
      description: 'Tendang orang dari server ini.',
      moderating: true,
      usage: [
        { require: ['userID', 'userMention'] },
        { optional: ['reason'] }
      ],
      permission: ['KICK_MEMBERS']
    })
    Router.load('Ban', {
      command: 'ban',
      description: 'Banned orang dari server ini.',
      moderating: true,
      usage: [
        { require: ['userID', 'userMention'] },
        { optional: ['reason'] }
      ],
      permission: ['BAN_MEMBERS']
    })
    Router.load('Unban', {
      command: 'unban',
      description: 'Lepas banned orang dari server ini.',
      moderating: true,
      usage: [
        { require: ['userID'] }
      ],
      permission: ['BAN_MEMBERS']
    })
    Router.load('Warn', {
      command: 'warn',
      description: 'Beri peringatan pada orang di server ini.',
      moderating: true,
      usage: [
        { require: ['userID', 'userMention'] },
        { optional: ['reason'] }
      ]
    })
    Router.load('InfractionList', {
      command: ['warnlist', 'infraction'],
      description: 'Apa-apa saja pelanggaranmu/orang lain di server ini.',
      moderating: true,
      usage: [
        { optional: ['userID', 'userMention'] }
      ]
    })
    Router.load('InfractionClear', {
      command: 'warnclear',
      description: 'Hapus semua pelanggaran yang lalu.',
      moderating: true,
      usage: [
        { optional: ['userID', 'userMention'] }
      ]
    })
    Router.load('Mute', {
      command: 'mute',
      description: 'Bungkam member di server ini.\n\n' +
        'Catatan Penting: Apabila server bot mati, riwayat mute akan dihapus dari bot. ' +
        'Mungkin kedepannya akan dibuat secara otomatis. Tapi tenang, akan ada timestamp yang muncul setelah anda berhasil ' +
        'membungkam orang tersebut.',
      moderating: true,
      usage: [
        { require: ['userID', 'userMention'] },
        { optional: ['"[xh].[xm].[xs]"'] },
        { optional: ['reason'] }
      ]
    })
    Router.load('Unmute', {
      command: 'unmute',
      description: 'Lepas bungkaman member di server ini.',
      moderating: true,
      usage: [
        { require: ['userID', 'userMention'] }
      ]
    })
    Router.load('FunnyBanned', {
      command: 'fban',
      description: 'Banned, tapi boong.',
      moderating: true,
      usage: [
        { require: ['userID', 'userMention'] },
        { optional: ['reason'] }
      ]
    })
    Router.load('RoleModifier', {
      command: 'role',
      description: 'Modifikasi role.',
      moderating: true,
      usage: [
        { require: ['userID', 'userMention'] },
        { require: ['remove', 'add'] },
        { require: ['roleName/roleID', '...role'] }
      ]
    })
    Router.load('Prune', {
      command: 'prune',
      description: 'Bulk Delete/Prune/Apus pesan beruntun',
      moderating: true,
      usage: [
        { require: ['messageCount'] }
      ]
    })
  })

  /**
   * Server Group
   * Manipulasi server di sini
   */
  Router.group('Server').then(Router => {
    Router.load('Registration', {
      command: ['register', 'regist'],
      description: 'Sebelum masuk di server ini, kamu harus register terlebih dahulu'
    })
  })
}
