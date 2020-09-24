import { Sequelize } from './_Connection'
import { DataTypes, Model, Optional } from 'sequelize'

/**
 * Model list
 */
interface IWarnList {
  id: number
  serverID: string
  memberID: string
  staffID: string
  reason: string
  dateExecuted: string
}
/**
 * Optional input
 */
type IOptionalProperty = 'id'

interface OptionalProperty extends Optional<IWarnList, IOptionalProperty> {}
interface UWarnList extends Model<IWarnList, OptionalProperty>, IWarnList {}

export default Sequelize.define<UWarnList>(
  'tbl_warn_list',
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
    staffID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dateExecuted: {
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
