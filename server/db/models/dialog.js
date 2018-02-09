const Sequelize = require('sequelize')
const db = require('../db')

const Dialog = db.define("dialog", {
  content: {
    type: Sequelize.TEXT,
    validate: {
      isAlphanumeric: true,
      notNull: true,
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM('success','failure','hint','story'),
    validate: {
      isAlphanumeric: true,
      notNull: true,
      notEmpty: true
    }
  }
})

module.exports = Dialog
