const User = require('./user')
const Dialog = require('./dialog')
const Problem = require('./problem')
const UserProblem = require('./userProblem')

/**
 * 1. adds problemId to each Dialog instance
 * 2. allows of eager loading
 * 3. gives sequelize methods (getProblems, setDialog, etc)
 */
Dialog.belongsTo(Problem)
Problem.hasMany(Dialog)

User.belongsToMany(Problem, {through: UserProblem})
Problem.belongsToMany(User, {through: UserProblem})

module.exports = {
  User,
  Dialog,
  Problem,
  UserProblem
}
