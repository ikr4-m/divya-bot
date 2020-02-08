/* eslint-disable */
const { Client, Message } = require('@components/DiscordClient')
const { Role, GuildMember } = require('discord.js')
/* eslint-enable */

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  const guild = message.guild
  const member = message.mentions.members.first() || guild.members.get(args[0])
  const roleStr = args.slice(2).join(' ').split(' | ')
  /** @type {'remove' | 'add'} */
  const command = args[1]

  // Check vibe dude
  if (!member || !command || roleStr.length === 0) return message.reply(client.usage('Moderation::RoleModifier'))

  /** @type {Role[]} */
  const roleResolve = []
  roleStr.forEach(role => {
    const r = guild.roles.get(role) || guild.roles.find(r => r.name === role) || null
    if (!r) return message.reply(`tidak ada role yang bernama **${role}** di sini`)
    else {
      // Level Check
      // Logikanya gini, kita ukur level rolenya berdasarkan authornya.
      // Apabila role yang diminta oleh author itu lebih besar levelnya
      // daripada role level terakhir maka kembaliannya adalah 1.

      let highestLevel = 0
      message.guild.members.get(message.author.id).roles.forEach(r => {
        if (r.position > highestLevel) highestLevel = r.position
      })
      highestLevel > r.position
        ? roleResolve.push(r)
        : message.reply(`role **${r.name}** terlalu tinggi darimu.`)
    }
  })

  if (command === 'add') addRole()
  else if (command === 'remove') removeRole()

  async function removeRole () {
    roleResolve.forEach(async role => {
      try {
        await member.removeRole(role)
        await message.channel.send(`Role **${role.name}** berhasil dicopot pada <@!${member.id}>!`)
      } catch (error) {
        message.channel.send(`Sepertinya role **${role.name}** tidak dapat dicabut dikarenakan role tersebut tidak ada atau aku tidak bisa mencabutnya.`)
      }
    })
  }

  async function addRole () {
    roleResolve.forEach(async role => {
      await member.addRole(role)
      await message.channel.send(`Role **${role.name}** berhasil ditambahkan pada <@!${member.id}>!`)
    })
  }
}
