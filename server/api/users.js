const router = require('express').Router()
const {User, Problem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
});

//creates an association on the UserProblem join table by finding theuser and the problem, returning them via promise.all, and using sequelize association method to set the user on the problem
router.post('/:userId/:level/:problemNumber', (req, res, next) => {
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
    //the aforementioned sequelize method
    user.addProblem(problem)
  })
  .then(() => res.sendStatus(200))
  .catch(next)
});
