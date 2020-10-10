import { Sequelize } from './_Connection'
import { DataTypes, Model, Optional } from 'sequelize'

/**
 * Model list
 */
interface IBadwordImmune {
  id: number
  serverID: string
  roleID: string
}
/**
 * Optional input
 */
type IOptionalProperty = 'id'

interface OptionalProperty extends Optional<IBadwordImmune, IOptionalProperty> {}
interface UBadwordImmune extends Model<IBadwordImmune, OptionalProperty>, IBadwordImmune {}

export default Sequelize.define<UBadwordImmune>(
  'tbl_badword_immune',
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
