const Sequelize = require('sequelize')
const { QueryInterface } = require('sequelize')

module.exports = {
  /**
   * @param {QueryInterface} query
   */
  up: async (query) => {
    await query.createTable('tbl_badword_victim', {
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
      channelID: {
        type: Sequelize.STRING,
        allowNull: false
      },
      badword: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timestamp: {
        type: 'DATETIME',
        allowNull: false
      }
    })
  },
  /**
   * @param {QueryInterface} query
   */
  down: async (query) => {
    await query.dropTable('tbl_badword_victim')
  }
}