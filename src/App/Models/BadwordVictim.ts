import { Sequelize } from './_Connection'
import { DataTypes, Model, Optional } from 'sequelize'

/**
 * Model list
 */
interface IBadwordVictim {
  id: number
  serverID: string
  memberID: string
  channelID: string
  badword: string
  timestamp: string
}
/**
 * Optional input
 */
type IOptionalProperty = 'id'

interface OptionalProperty extends Optional<IBadwordVictim, IOptionalProperty> {}
interface UBadwordVictim extends Model<IBadwordVictim, OptionalProperty>, IBadwordVictim {}

export default Sequelize.define<UBadwordVictim>(
  'tbl_badword_victim',
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
    channelID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    badword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp: {
      type: 'DATETIME',
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
