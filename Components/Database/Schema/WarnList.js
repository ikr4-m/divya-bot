const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

module.exports = mongoose.model('WarnList', Schema({
  memberID: String,
  guildID: String,
  infractions: [
    {
      code: String,
      reason: String,
      staffID: String
    }
  ]
}))
