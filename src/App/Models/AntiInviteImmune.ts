import { Sequelize } from './_Connection'
import { DataTypes, Model, Optional } from 'sequelize'

/**
 * Model list
 */
interface IAntiInviteImmune {
  id: number
  serverID: string
  roleID: string
}
/**
 * Optional input
 */
type IOptionalProperty = 'id'

interface OptionalProperty extends Optional<IAntiInviteImmune, IOptionalProperty> {}
interface UAntiInviteImmune extends Model<IAntiInviteImmune, OptionalProperty>, IAntiInviteImmune {}

export default Sequelize.define<UAntiInviteImmune>(
  'tbl_antiinvite_immune',
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
