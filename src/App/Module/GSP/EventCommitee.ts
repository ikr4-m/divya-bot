import MEvtCommitee from '../../Models/EventCommiteeGSP'
import { GuildMember } from 'discord.js'

export function GetECList (serverID: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    MEvtCommitee
      .findAll({ where: { serverID: serverID } })
      .then(evtCom => resolve(evtCom.map(e => e.roleID)))
      .catch(err => reject(err))
  })
}

export async function ifEventCommitee (member: GuildMember): Promise<boolean> {
  const ecList = await GetECList(member.guild.id)
  return new Promise((resolve, _reject) => {
    if (!member) resolve(false)
    let trigger = false
    ecList.forEach(ec => {
      if (member.roles.cache.has(ec)) trigger = true
    })

    resolve(trigger)
  })
}
