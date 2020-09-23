const Sequelize = require('sequelize')
const { QueryInterface } = require('sequelize')

module.exports = {
  /**
   * @param {QueryInterface} query
   */
  up: async (query) => {
    await query.createTable('tbl_temp_mute', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      serverID: {
        type: Sequelize.STRING,
        allowNull: false
      },
      memberID: {
        type: Sequelize.STRING,
        allowNull: false
      },
      startTime: {
        type: 'DATETIME',
        allowNull: false
      },
      expired: {
        type: 'DATETIME',
        allowNull: false
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      executed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    })
  },
  /**
   * @param {QueryInterface} query
   */
  down: async (query) => {
    await query.dropTable('tbl_temp_mute')
  }
}