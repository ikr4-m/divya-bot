import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import { CaptchaGenerator } from 'captcha-canvas'

export default class Register extends Command {
  constructor() {
    super({
      name: 'register',
      description: 'Dapatkan role Membermu di sini!'
    })
  }

  public async run(_client: Client, message: Message, _args: string[]): Promise<any> {
    const libraryString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
    const sizeCaptcha = 6
    let generateCaptchaString = ''
    for (let i = 0; i < sizeCaptcha; i++) {
      generateCaptchaString += libraryString[Math.floor(Math.random() * libraryString.length)]
    }
    const captchaString = generateCaptchaString.toLowerCase()
    const captcha = new CaptchaGenerator()
      .setDimension(150, 450)
      .setCaptcha({ size: 60, color: 'deeppink', text: generateCaptchaString })
      .setDecoy({ opacity: 0.85, size: 55 })
      .setTrace({ color: 'deeppink' })

    message.author.createDM()
      .then(async dmchannel => {
        await message.reply('cek DM kamu sekarang!')

        dmchannel.send(
          'Kamu memiliki waktu 1 menit untuk menyelesaikan tantangan ini.\nSilahkan ketik kode di bawah ini untuk menyelesaikannya!', {
            files: [{
              attachment: captcha.generateSync()
            }]
          }
        )
        dmchannel.awaitMessages(
          (respone: Message) => respone.author.id === message.author.id,
          { max: 1, time: 60000, errors: ['time'] }
        )
          .then(collection => {
            const code = collection.first().content
            const trigger = code.toLowerCase() === captchaString
            dmchannel.send(`Kode keamanan ${trigger ? 'benar. Selamat datang!' : 'salah. Silahkan ulangi kembali.'}`)
          })
          .catch(_err => {
            message.channel.send('Waktu habis! Silahkan request kembali.')
          })
      })
      .catch(_err => {
        message.reply('izinkan saya untuk dapat meng-DM kamu terlebih dahulu sebelum menggunakan perintah ini.')
      })
  }
}
