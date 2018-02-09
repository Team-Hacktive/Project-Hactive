const Sequelize = require('sequelize')
const db = require('../db')

const Dialog = db.define("dialog", {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM('success','failure','hint','story'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})
