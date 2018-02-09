const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true
      }
    },
    prompt: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true
      }
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notNull: true
      }
    },
    Progress: {
      type: Sequelize.TEXT, // or Sequelize.JSON / .JSONB
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true
      }
    }
})

module.exports = Problem
