const mongoose = require('mongoose')
const { EventEmitter } = require('events')
const Console = require('@components/Console')

module.exports = class MongoAdapter extends EventEmitter {
  constructor (url, params) {
    super()
    this.url = url

    this._connectParam = {}
    this._connectParam.useNewUrlParser = true
    this._connectParam.useUnifiedTopology = true
    const keys = Object.keys(params)
    keys.forEach((key) => {
      this._connectParam[key] = params[key]
    })
  }

  getMongo () {
    return mongoose
  }

  connect () {
    mongoose.connect(this.url, this._connectParam).then(() => {
      delete this._connectParam
      Console.info('MongoDB Driver has successfully make a handshake to Atlas Server')
    }).catch(err => {
      throw new Error('[MongoAdapter] Could not connect to the database. Exiting now...' + err)
    })
  }
}
