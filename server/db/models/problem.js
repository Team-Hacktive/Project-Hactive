const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    prompt: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    problemNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    }
})

module.exports = Problem
