const mongoose = require('mongoose')

module.exports = function getController (BaseModel) {
  return class Controller {
    constructor () {
      this.model = BaseModel
    }

    /**
     * @returns {Promise<any[]>}
     */
    get (id, validate = false) {
      return new Promise((resolve, reject) => {
        if (validate) {
          if (!mongoose.Types.ObjectId.isValid(id)) reject(new Error('Please provide correct ID'))
        }
        BaseModel.findById(id).then((data) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    }

    /**
     * @returns {Promise<any[]>}
     */
    getBulk (filter = {}) {
      return new Promise((resolve, reject) => {
        BaseModel.find(filter).then((data) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    }

    /**
     * @returns {Promise<any[]>}
     */
    getOne (filter = {}) {
      return new Promise((resolve, reject) => {
        BaseModel.findOne(filter).then((data) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    }

    create (data) {
      const newdata = new BaseModel(data)
      return new Promise((resolve, reject) => {
        newdata.save().then(data => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    }

    delete (id, validate = false) {
      return new Promise((resolve, reject) => {
        if (validate) {
          if (!mongoose.Types.ObjectId.isValid(id)) reject(new Error('Please provide correct ID'))
        }
        BaseModel.findOneAndRemove({ _id: id }).then((data) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    }

    deleteBulk (filter = {}) {
      return new Promise((resolve, reject) => {
        BaseModel.remove(filter).then((data) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    }

    set (id, data = {}, options = { multi: false }) {
      return new Promise((resolve, reject) => {
        BaseModel.update({ _id: id }, { $set: data }, options).then((data) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
