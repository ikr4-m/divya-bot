import { Sequelize } from './_Connection'
import { DataTypes, Model } from 'sequelize'

class StaffList extends Model {
  public id!: number
  public serverID!: string
  public roleID!: string
}

StaffList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    serverID: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    roleID: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'tbl_staff_list',
    sequelize: Sequelize,
    createdAt: false,
    updatedAt: false
  }
)

export default StaffList
