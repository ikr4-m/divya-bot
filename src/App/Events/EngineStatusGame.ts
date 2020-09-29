import Client from '../Client'
import Events from '../Events'

export default class EngineStatusGame extends Events {
  constructor() {
    super('ready')
  }

  public async run(client: Client): Promise<any> {
    setInterval(() => {
      const state = client.state
      if (state.presence.status) {
        const msg = state.presence.message[Math.floor(Math.random() * state.presence.message.length)]
        client.user.setPresence({
          activity: {
            name: `${client.config.botPrefix}help | ${msg}`,
            type: 'PLAYING'
          }
        })
      }
    }, client.state.presence.interval)
  }
}
