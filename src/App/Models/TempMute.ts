import { Sequelize } from './_Connection'
import { DataTypes, Model, Optional } from 'sequelize'

/**
 * Model list
 */
interface ITempMute {
  id: number
  serverID: string
  memberID: string
  startTime: string
  expired: string
  reason: string
  executed: boolean
}
/**
 * Optional input
 */
type IOptionalProperty = 'id' | 'executed'

interface OptionalProperty extends Optional<ITempMute, IOptionalProperty> {}
interface UTempMute extends Model<ITempMute, OptionalProperty>, ITempMute {}

export default Sequelize.define<UTempMute>(
  'tbl_temp_mute',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    serverID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    memberID: {
      type: DataTypes.STRING,
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
      type: DataTypes.TEXT,
      allowNull: false
    },
    executed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
