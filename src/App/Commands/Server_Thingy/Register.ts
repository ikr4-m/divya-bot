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

  public async run(client: Client, message: Message, _args: string[]): Promise<any> {
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
    message.reply('Tes capcay, kodenya ' + captchaString, {
      files: [{
        attachment: captcha.generateSync(),
        name: `${message.author.id}_${message.guild.id}_${client.config.botName}-CAPTCHA.png`
      }]
    })
  }
}
