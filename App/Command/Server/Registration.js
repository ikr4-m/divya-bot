const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  const ijoIjo = message.guild.roles.get('433968434376736770')
  const author = message.author
  const guild = message.guild

  // Apakah member itu ada "Ijonya"
  if (guild.members.get(author.id).roles.has(ijoIjo.id)) {
    message.reply('anda telah diverifikasi.')
    return undefined
  }

  await message.reply('cek DM kamu!')

  await author.createDM()
    .then(async authorMsg => {
      // Mulai untuk logika captcha
      const allString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const newSplitString = allString.split('')
      let randString = ''
      for (let i = 0; i < 5; i++) {
        randString += newSplitString[Math.floor(Math.random() * newSplitString.length)]
      }

      await authorMsg.send(
        `**[VERIFIKASI]**\nUntuk dapat terverifikasi dalam server ini, anda hanya mempunyai waktu 1 menit saja untuk mengetik \`${randString}\` pada DM ini.`
      )
      authorMsg.awaitMessages(m => typeof m.content === 'string', { time: 60000, max: 1, errors: ['time'] })
        .then(async msg => {
          const content = msg.first().content
          if (content !== randString) {
            authorMsg.send('Verifikasi ditolak! Silahkan register kembali.')
            return undefined
          } else {
            await guild.members.get(author.id).addRole(ijoIjo)
            await authorMsg.send(
              'Anda telah berhasil terverifikasi. Selamat bermain, dan jangan lupa untuk selalu cek **<#433972979047596043>** untuk peraturan server ini dan **<#433974977868464150>** untuk info penting dari server ini.'
            )
          }
        })
        /* eslint-disable */
        .catch(err => {
          // console.log(err)
          authorMsg.send('Waktu habis! Silahkan register kembali.')
        })
        /* eslint-enable */
    })
    /* eslint-disable */
    .catch(err => {
      message.reply('tolong nyalakan DM untuk kali ini saja.')
    })
    /* eslint-enable */
}
