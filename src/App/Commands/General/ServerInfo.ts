import { Message, MessageEmbed, VerificationLevel } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import Moment from 'moment'

export default class ServerInfo extends Command {
  constructor() {
    super({
      name: ['serverinfo', 'server'],
      description: 'Liat informasi dari server ini.'
    })
  }

  private verificationLevel(guild: VerificationLevel): string {
    let ret = ''
    switch (guild) {
      case 'NONE':
        ret = 'Tidak ada verifikasi.'
        break
      case 'LOW':
        ret = 'Rendah (Verifikasi email Discord).'
        break
      case 'MEDIUM':
        ret = 'Menengah (Terdaftar di Discord selama 5 menit).'
        break
      case 'HIGH':
        ret = 'Tinggi (Menjadi member server selama 10 menit).'
        break
      case 'VERY_HIGH':
        ret = 'Sangat Tinggi (Harus verifikasi nomor telepon di Discord).'
        break
    }
    return ret
  }

  public async run(client: Client, message: Message, _args: string[]): Promise<any> {
    const guild = message.guild
    
    const embed = new MessageEmbed()
      .setColor(client.config.botColor)
      .setTimestamp()
      .setFooter(`Direquest oleh ${message.author.tag}`, client.user.displayAvatarURL())
      .setThumbnail(guild.iconURL())
      .setTitle(`[${guild.nameAcronym}] ${guild.name}`)

      .addFields([
        {
          name: 'Level Verifikasi',
          value: this.verificationLevel(guild.verificationLevel),
          inline: false
        },
        {
          name: 'Lokasi',
          value: guild.region,
          inline: true
        },
        {
          name: 'Anggota Server',
          value: `${guild.members.cache.size} orang`,
          inline: true
        },
        {
          name: `Kanal [${guild.channels.cache.size}]`,
          value: `${guild.channels.cache.filter(g => g.type === 'category').size} Kategori\n` +
            `${guild.channels.cache.filter(g => g.type === 'text').size} Kanal Teks\n` +
            `${guild.channels.cache.filter(g => g.type === 'voice').size} Kanal Suara`,
          inline: true
        },
        {
          name: `Pemilik Server`,
          value: `<@!${guild.ownerID}>`,
          inline: true
        },
        {
          name: `Tanggal Dibuat`,
          value: Moment(guild.createdAt).utcOffset('+08:00').format('dddd, DD MMMM YYYY (HH:mm:ss [WITA])'),
          inline: false
        }
      ])

    message.channel.send(`<@!${message.author.id}>`, { embed })
  }
}
