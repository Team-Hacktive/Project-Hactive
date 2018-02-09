const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
    name: {
      type: Sequelize.STRING,
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true
      }
    },
    prompt: {
      type: Sequelize.TEXT,
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true
      }
    },
    level: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
        notNull: true
      }
    },
    Progress: {
      type: Sequelize.TEXT, // or Sequelize.JSON / .JSONB
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true
      }
    }
})

module.exports = Problem
