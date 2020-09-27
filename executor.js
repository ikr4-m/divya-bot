const cmd = require('node-cmd')
const param = process.argv.slice(2).join(' ')

const exec = cmd.run(param)
exec.stdout.on('data', data => {
  console.log(data)
})
