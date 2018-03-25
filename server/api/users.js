const router = require('express').Router()
const {User, Problem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next)
});

//check if a user and problem are already associated
router.get('/:userId/:problemId', (req, res, next) => {
  console.log('********************* I work until here')
  Promise.all([
    User.findById(req.params.userId),
    Problem.findById(req.params.problemId)
  ])
  .then(([user, problem]) => {
    return problem.hasUser(user)
  })
  .then(result => res.json(result))
  .catch(next)
})

//creates an association on the UserProblem join table
router.post('/:userId/:problemId', (req, res, next) => {
  //need promise.all here because need both values for addUser
  Promise.all([
    User.findById(req.params.userId),
    Problem.findById(req.params.problemId)
  ])
  .then(([user, problem]) => {
    //addUser is a sequelize method
    problem.addUser(user)
  })
  .then(() => res.sendStatus(200))
  .catch(next)
});
