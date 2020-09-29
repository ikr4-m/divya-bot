const Sequelize = require('sequelize')
const { QueryInterface } = require('sequelize')

module.exports = {
  /**
   * @param {QueryInterface} query
   */
  up: async (query) => {
    await query.createTable('tbl_antiinvite_server', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      serverID: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },
  /**
   * @param {QueryInterface} query
   */
  down: async (query) => {
    await query.dropTable('tbl_antiinvite_server')
  }
}