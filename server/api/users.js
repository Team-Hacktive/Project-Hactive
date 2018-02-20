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


//creates an association on the UserProblem join table
router.post('/:userId/:level/:problemNumber', (req, res, next) => {
  //need promise.all here because need both values for addUser
  Promise.all(
    [User.findOne({
      where: {
        id: req.params.userId,
      }
    }),
    Problem.findOne({
      where: {
        problemNumber: req.params.problemNumber,
        level: req.params.level
      }
    })]
  )
  .then(([user, problem]) => {
    //addUser is a sequelize method
    problem.addUser(user)
  })
  .then(() => res.sendStatus(200))
  .catch(next)
});
