import { GuildMember, Role } from 'discord.js';
import { ReturningTempMute } from '../../../@Types/Moderation/TempMute'
import MTempMute from '../../Models/TempMute'
import Moment from 'moment'
import Client from '../../Client';

export function parsingPlainTime (plainTime: string): ReturningTempMute {
  const template = plainTime.substring(plainTime.length - 1)
  const time = parseInt(plainTime.substring(0, plainTime.length - 1))
  const now = Moment()
  const rets: ReturningTempMute = {
    prettyTime: '',
    engTime: '',
    intTime: 0,
    startTime: now,
    endTime: now
  }
  
  switch (template) {
    // Seconds
    case 's':
      rets.prettyTime = 'detik'
      rets.engTime = 'seconds'
      rets.intTime = time
      rets.startTime = now
      rets.endTime = now.add(time, 's')
      break
    // Minutes
    case 'm':
      rets.prettyTime = 'menit'
      rets.engTime = 'minutes'
      rets.intTime = time
      rets.startTime = now
      rets.endTime = now.add(time, 'm')
      break
    // Hours
    case 'h':
      rets.prettyTime = 'jam'
      rets.engTime = 'hours'
      rets.intTime = time
      rets.startTime = now
      rets.endTime = now.add(time, 'h')
      break
    // Days
    case 'd':
      rets.prettyTime = 'hari'
      rets.engTime = 'days'
      rets.intTime = time
      rets.startTime = now
      rets.endTime = now.add(time, 'd')
      break
  }

  return rets
}

export function isTimeValid (plainTime: string) {
  const template = plainTime.substring(plainTime.length - 1)
  const time = parseInt(plainTime.substring(0, plainTime.length - 1))
  let boolRet: boolean

  switch (template) {
    case 's':
    case 'm':
    case 'h':
    case 'd':
      boolRet = true
      break
    default:
      boolRet = false
      break
  }

  // Check if can parse
  boolRet = !time || typeof time === 'undefined' || time < 0 ? false : true

  return boolRet
}

export function setTempMute (client: Client, member: GuildMember, role: Role, plainTime: string, reason: string): Promise<ReturningTempMute> {
  return new Promise((resolve, reject) => {
    const now = Moment()
    const parsed = parsingPlainTime(plainTime)
    const endTime = parsed.endTime

    // Balikin ke server dulu
    MTempMute
      .create({
        serverID: member.guild.id,
        memberID: member.id,
        startTime: now.format(),
        expired: endTime.format(),
        reason
      })
      .then(async data => {
        // Simpan ke bot
        client.state.tempMute.set(
          `${data.serverID}:${data.memberID}`,
          endTime
        )
        // Pasang rolenya
        await member.roles.add(role)
        resolve(parsed)
      })
      .catch(err => {
        reject(err)
      })
  })
}
