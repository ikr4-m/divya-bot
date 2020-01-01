const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
const { Collection } = require('discord.js')
const stringFormat = require('string-format')

/**
 * @param {Client} client
 */
module.exports = (client) => {
  /**
   * @param {Message} message
   */
  client.on('message', (message) => {
    const prefix = client.config.bot_prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args[0].toLowerCase()
    const commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    const member = message.author

    // Fix prefix override
    if (!message.content.startsWith(prefix)) return undefined

    // Apabila tidak ada commandnya
    if (!commandFile) return undefined

    // Tidak bisa digunakan di DM (Update selanjutnya bakal bisa)
    if (message.channel.type !== 'text') return undefined

    // Apabila yang eksekusi cuma member biasa sedangkan commandnya hanya untuk mod
    if (!message.guild.members.get(member.id).hasPermission('MANAGE_ROLES')) {
      if (commandFile.moderating === true) {
        message.reply('Sayangnya, perintah tersebut hanya untuk **orang yang berwenang**.')
        return undefined
      }
    }

    // Tangkis lack permission
    if (commandFile.permission.length > 0) {
      const lackPerms = []
      const permsLength = commandFile.permission.length
      let countPerms = 1
      commandFile.permission.forEach(perms => {
        if (!message.guild.members.get(member.id).hasPermission(perms)) {
          const dan = countPerms !== 1 && countPerms === permsLength ? 'dan ' : ''
          lackPerms.push(dan + perms.toLowerCase().split('_').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '))
        }
        countPerms++
      })
      if (lackPerms.length > 0) {
        return message.reply(`anda tidak memiliki hak **${lackPerms.join(', ')}** untuk menggunakan command ini.`)
      }
    }

    // If development
    if (process.env.DEV === 'true') {
      if (message.content.startsWith(prefix) && !client.config.maintener.includes(message.author.id)) {
        return message.channel.send(`:wave: | Hello <@${message.author.id}>, bot ini sedang diperbaiki!.`)
      }
    }

    // BEGIN COOLDOWN //
    const namaCommand = typeof commandFile.command !== 'string'
      ? commandFile.command[0]
      : commandFile.command
    /**
      * @type {Collection<string, any>}
      */
    const cooldown = new Collection()

    if (!commandFile) return undefined
    if (!cooldown.has(namaCommand)) {
      cooldown.set(namaCommand, new Collection())
    }

    // Register member
    const now = Date.now()
    const timestamps = cooldown.get(namaCommand)
    const cooldownCount = commandFile.cooldown
    const cooldownAmount = (cooldownCount || 5) * 1000

    if (!timestamps.has(member.id)) {
      timestamps.set(member.id, now)
    } else {
      const expirationTime = timestamps.get(member.id + cooldownAmount)
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 10000
        return message.reply(`please wait about ${timeLeft} to using this command again.`)
      }
    }
    // END COOLDOWN //

    // Mencoba untuk eksekusi command
    try {
      client.console.info(stringFormat('{user} execute {command}!', {
        user: `${member.username}#${member.discriminator}`,
        command: cmd
      }))
      commandFile.run(client, message, args.slice(1))
    } catch (error) {
      console.log(error)
    }
  })
}
