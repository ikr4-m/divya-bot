import { Collection } from 'discord.js'
import { Moment } from 'moment'
import moment from 'moment'

/**
 * You can use this state to store your global variable to your bot
 * like storing music queue or something like that.
 */
export default {
  /**
   * Menjelaskan status presence secara global.
   */
  presence: {
    status: true,
    interval: 5000,
    message: [
      "Daddy! -w-",
      "Not a bot, but a robot.",
      "Watching you all",
      "Love you all!! (●♡∀♡)"
    ]
  },

  /**
   * Diisi untuk temporal mute di sini.
   * @description Untuk keynya, serverID:memberID
   */
  tempMute: new Collection<string, Moment>(),

  /**
   * Gesper state here.
   */
  gesper: {
    /** Penanggung jawab acara */
    personInCharge: '',
    serverID: '',
    channelID: '',
    eventName: '',
    uniqueMember: [],
    host: [],
    guest: [],
    started: false,
    whenStarted: moment()
  }
}
