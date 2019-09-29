const Router = require('@scripts/EventRouter')

module.exports = (client) => {
  Router(client, [
    {
      filename: 'Ready',
      events: 'ready'
    },
    {
      filename: 'PingTest',
      events: 'message'
    }
  ])
}
