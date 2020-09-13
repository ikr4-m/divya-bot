import { Sequelize } from 'sequelize'
import Path from 'path'
import FS from 'fs'

const storagePath = Path.join(__dirname, '../../../../Database/database.db')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false
})

const checkConnection = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    FS.readFile(storagePath, (err, _data) => {
      if (err) reject(err)
      sequelize.authenticate({ logging: false })
        .then(() => {
          resolve(true)
        })
        .catch(err => reject(err))
    })
  })
}

export { sequelize as Sequelize, checkConnection }
