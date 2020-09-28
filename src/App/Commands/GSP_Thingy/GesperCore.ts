import { Message, MessageEmbed } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import Moment from 'moment'
import { ifEventCommitee } from '../../Module/GSP/EventCommitee'
import { ifStaff } from '../../Module/Moderation/StaffList'
// import MEvtCom from '../../Models/EventCommiteeGSP'

export default class GesperCore extends Command {
  constructor() {
    super({
      name: 'gesper',
      description: 'Gesper Core',
      args: [
        { name: 'command', require: false, type: 'BLOCK' },
        { name: '...args', require: false, type: 'BLOCK' }
      ],
      example: 'gesper'
    })
  }

  async startGesperCore (client: Client, message: Message): Promise<any> {
    await message.channel.send(
      `Penanggung jawab kali ini adalah <@!${message.author.id}>\nKetik \`cancel\` apabila ingin membatalkan konfigurasi ini.`
    )
    
    const embedBuilder = new MessageEmbed()
      .setColor(client.config.botColor)
      .setTitle('Konfigurasi GESPER')
      .setDescription('Sebutkan channel yang ingin kamu gunakan untuk GESPER kali ini!')

    try {
      const messageDominator = await message.channel.send(embedBuilder)
      const config = {
        channelID: '',
        serverID: '',
        executor: '',
        break: false
      }

      /**
       * Tanya channelnya di mana
       */
      await message.channel.awaitMessages(
        (m: Message) => {
          return (
              m.content.toLowerCase() === 'cancel' || (m.content.startsWith('<#') && m.content.endsWith('>'))
              || message.guild.channels.cache.has(m.content)
            ) 
            && m.author.id === message.author.id
        },
        {
          time: 30000,
          max: 1,
          errors: ['time']
        }
      )
        .then(async collected => {
          const data = collected.first()
          await data.delete()

          config.break = data.content.toLowerCase() === 'cancel' ? true : false
          config.channelID = data.content.toLowerCase() !== 'cancel' ? data.content.match(/\d+/)[0] : ''
          config.serverID = message.guild.id
          config.executor = data.author.id
          console.log(config)
        })
        .catch(_err => {
          message.channel.send('Waktu habis!')
        })
      if (config.break) {
        embedBuilder.setDescription('Konfigurasi dibatalkan')
        await messageDominator.edit(embedBuilder)
        return undefined
      }
      embedBuilder.setDescription('Sedang mengambil beberapa plugin...')
      await messageDominator.edit(embedBuilder)

      /**
       * Reserved for loading all automatic module here
       */

      embedBuilder.setDescription(
        `
        Anda telah memilih <#${config.channelID}> sebagai tempat acara.
        Silahkan menggunakan \`${client.config.botPrefix}gesper stop\` untuk menghentikan acara.
        `
      )
      await messageDominator.edit(embedBuilder)

      // Preconfig in here
      client.state.gesper.started = true
      client.state.gesper.personInCharge = config.executor
      client.state.gesper.whenStarted = Moment()
      client.state.gesper.serverID = config.serverID
      client.state.gesper.channelID = config.channelID
    } catch (error) {
      message.reply(client.constant.errReason(error))
    }
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const executor = await message.guild.members.fetch(message.author.id)
    if (!await ifEventCommitee(executor) || !await ifStaff(executor)) {
      if (!executor.hasPermission('ADMINISTRATOR')) return message.reply(
        'hanya EVENT COMMITEE yang berhak untuk mengeksekusi command ini!'
      )
    }

    if (args.length === 0) {
      if (client.state.gesper.started) return message.channel.send(
        `GESPER sudah dimulai di <#${client.state.gesper.channelID}> oleh <@!${client.state.gesper.personInCharge}>.`
      )
      else {
        this.startGesperCore(client, message)
      }
    }
  }
}
