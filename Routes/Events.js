module.exports = (client) => {
  const Router = new (require('@scripts/EventRouter'))(client)

  Router.load('ready', 'Ready')
  Router.load('message', 'PingTest')
}
