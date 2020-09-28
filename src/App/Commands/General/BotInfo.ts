import { Message, MessageEmbed } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import Axios from 'axios'
import Moment from 'moment'

export default class BotInfo extends Command {
  constructor() {
    super({
      name: 'botinfo',
      description: 'Berisi informasi tentang bot.'
    })
  }

  public async run(client: Client, message: Message, _args: string[]): Promise<any> {
    const pkgs = await Axios.get('https://raw.githubusercontent.com/skymunn/gsp-bot/master/package.json')
    if (!pkgs) return message.reply('tanyakan kepada staff tentang error ini:\n```Link Package hilang.```')
    const data = pkgs.data
    const uptime = Moment().diff(client.state.uptime)
    
    const embed = new MessageEmbed()
      .setColor(client.config.botColor)
      .setTimestamp()
      .setFooter('https://github.com/skymunn/gsp-bot', client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle(`Statistik ${client.config.botName}`)

      .addFields([
        {
          name: 'Mesin Perang',
          value: `NodeJS ${data.engines.node}\nTypescript ${data.devDependencies.typescript}\nDiscordJS ${data.devDependencies['discord.js']}`,
          inline: false
        },
        {
          name: 'Versi Bot',
          value: data.version,
          inline: true
        },
        {
          name: 'Lisensi Bot',
          value: data.license,
          inline: true
        },
        {
          name: 'Pembuat',
          value: client.config.owner.map(v => `<@!${v}>`).join(' '),
          inline: false
        },
        {
          name: 'Uptime',
          value: Moment.duration(uptime, 'millisecond').humanize(),
          inline: false
        }
      ])

    message.channel.send(`<@!${message.author.id}>`, { embed })
  }
}
