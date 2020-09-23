import MStaffList from '../../Models/StaffList'
import { GuildMember } from 'discord.js'

export function GetStaffList (serverID: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    MStaffList
      .findAll({ where: { serverID: serverID } })
      .then(staff => resolve(staff.map(st => st.roleID)))
      .catch(err => reject(err))
  })
}

export async function ifStaff (member: GuildMember): Promise<boolean> {
  const staffList = await GetStaffList(member.guild.id)
  return new Promise((resolve, _reject) => {
    if (!member) resolve(false)
    let triggerStaff = false
    staffList.forEach(st => {
      if (member.roles.cache.has(st)) triggerStaff = true
    })

    resolve(triggerStaff)
  })
}
