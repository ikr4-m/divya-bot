import { Sequelize } from './_Connection'
import { DataTypes, Model, Optional } from 'sequelize'

/**
 * Model list
 */
interface IStaffList {
  id: number
  serverID: string
  roleID: string
}
/**
 * Optional input
 */
type IOptionalProperty = 'id'

interface OptionalProperty extends Optional<IStaffList, IOptionalProperty> {}
interface UStaffList extends Model<IStaffList, OptionalProperty>, IStaffList {}

export default Sequelize.define<UStaffList>(
  'tbl_staff_list',
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
