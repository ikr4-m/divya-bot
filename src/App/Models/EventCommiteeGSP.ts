import { Sequelize } from './_Connection'
import { DataTypes, Model, Optional } from 'sequelize'

/**
 * Model list
 */
interface IEventComGSP {
  id: number
  serverID: string
  roleID: string
}
/**
 * Optional input
 */
type IOptionalProperty = 'id'

interface OptionalProperty extends Optional<IEventComGSP, IOptionalProperty> {}
interface UEventComGSP extends Model<IEventComGSP, OptionalProperty>, IEventComGSP {}

export default Sequelize.define<UEventComGSP>(
  'tbl_event_commitee',
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
    roleID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  }
)
