import { Sequelize } from './_Connection'
import { DataTypes, Model, Optional } from 'sequelize'

/**
 * Model list
 */
interface IAntiInviteServer {
  id: number
  serverID: string
}
/**
 * Optional input
 */
type IOptionalProperty = 'id'

interface OptionalProperty extends Optional<IAntiInviteServer, IOptionalProperty> {}
interface UAntiInviteServer extends Model<IAntiInviteServer, OptionalProperty>, IAntiInviteServer {}

export default Sequelize.define<UAntiInviteServer>(
  'tbl_antiinvite_server',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    serverID: {
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
