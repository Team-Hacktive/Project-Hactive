const User = require('./user')
const Dialog = require('./dialog')
const Problem = require('./problem')

/**
 * 1. adds problemId to each Dialog instance
 * 2. allows of eager loading
 * 3. gives sequelize methods (getProblems, setDialog, etc)
 */
Dialog.belongsTo(Problem)
Problem.hasMany(Dialog)

module.exports = {
  User,
  Dialog,
  Problem
}
