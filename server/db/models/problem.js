const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
    name: {
      type: Sequelize.STRING
    },
    prompt: {
      type: Sequelize.TEXT
    },
    level: {
      type: Sequelize.INTEGER
    },
    Progress: {
      type: Sequelize.TEXT
    }
})

module.exports = Problem
