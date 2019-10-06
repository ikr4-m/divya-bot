/**
 * @param {import('./CommandRouter').UsageConstructor[]} usage
 * @param {string} command
 * @returns {string}
 */
module.exports = (usage, command) => {
  let ret = `{prefix}${command} `
  usage.forEach(u => {
    if (typeof u.optional !== 'undefined') ret += `[${u.optional.join('|')}] `
    if (typeof u.require !== 'undefined') ret += `<${u.require.join('|')}> `
  })
  return ret.replace(/\s+$/, '')
}
