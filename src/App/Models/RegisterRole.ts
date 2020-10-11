import { Sequelize } from './_Connection'
import { DataTypes, Model, Optional } from 'sequelize'

/**
 * Model list
 */
interface IRegisterRole {
  id: number
  serverID: string
  roleID: string
}
/**
 * Optional input
 */
type IOptionalProperty = 'id'

interface OptionalProperty extends Optional<IRegisterRole, IOptionalProperty> {}
interface URegisterRole extends Model<IRegisterRole, OptionalProperty>, IRegisterRole {}

export default Sequelize.define<URegisterRole>(
  'tbl_register_role',
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
