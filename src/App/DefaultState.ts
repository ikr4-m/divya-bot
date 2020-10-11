import { Collection } from 'discord.js'
import { Moment } from 'moment'
import moment from 'moment'
import BadwordClass from './Module/Moderation/Badword'

/**
 * You can use this state to store your global variable to your bot
 * like storing music queue or something like that.
 */
export default {
  /**
   * Uptime saat bot ini pertama kali dinyalakan
   */
  uptime: moment(),
  
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
   * Anti Invite module di sini.
   * @description Dalam array berisi role yang "immune" dengan module ini di tiap server.
   */
  antiInvite: new Collection<string, string[]>(),

  /**
   * Badword module di sini
   */
  badword: new Collection<string, {
    immune: string[],
    list: BadwordClass
  }>(),

  /**
   * Register role di sini
   */
  register: new Collection<string, string>(),

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
