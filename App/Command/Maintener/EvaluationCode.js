/* eslint-disable no-eval */
const { Client, Message } = require('@components/DiscordClient') // eslint-disable-line
const util = require('util')

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports = async (client, message, args) => {
  // Only maintener can do it
  if (!client.config.maintener.includes(message.author.id)) return undefined

  const code = args.join(' ')
  // Detect the blockquote
  if (!code.startsWith('```js') && !code.startsWith('```')) {
    return message.reply(client.constant.usage(client.prefix, this.help.usage))
  } else {
    const newScript = code
      .match(/[^```]/gm)
      .join('')
      .split('\n')
      .splice(1)
      .join('')

    // Try the code
    try {
      let __eval__ = eval(newScript)
      console.log(__eval__)

      if (typeof __eval__ !== 'string') {
        __eval__ = util.inspect(__eval__, { depth: 0 })
      }

      message.channel.send(`Output:\n\`\`\`js\n${__eval__}\`\`\``)
    } catch (error) {
      message.channel.send(`Output:\n\`\`\`${error.message}\`\`\``)
    }
  }
}
