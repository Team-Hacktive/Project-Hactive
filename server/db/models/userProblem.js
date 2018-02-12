const Sequelize = require('sequelize')
const db = require('../db')

const UserProblem = db.define('UserProblem', {
    savedInput: {
        type: Sequelize.TEXT,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
})

module.exports = UserProblem;
