const router = require('express').Router()
const {User, Problem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'level']
  })
    .then(users => res.json(users))
    .catch(next)
});

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
    console.log("AM I HITTING THIS?????", user, problem)
    user.addProblem(problem)
  })
  .then(() => res.sendStatus(200))
  .catch(next)
});
