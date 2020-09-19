import MStaffList from '../../Models/StaffList'
import { Collection, Role } from 'discord.js'

function GetStaffList (serverID: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    MStaffList
      .findAll({ where: { serverID: serverID } })
      .then(staff => resolve(staff.map(st => st.roleID)))
      .catch(err => reject(err))
  })
}

async function ifStaff (role: Collection<string, Role>): Promise<boolean> {
  return new Promise(async (resolve, _reject) => {
    if (!role || role.size === 0) resolve(false)
    const staffList = await GetStaffList(role.first().guild.id)
    const specifiedRole = role.map(r => r.id)
    let triggerStaff = false
    specifiedRole.forEach(roles => {
      if (staffList.includes(roles)) triggerStaff = true
    })

    resolve(triggerStaff)
  })
}

export { GetStaffList, ifStaff }
