const router = require('express').Router()
const { Problem, Dialog, User, UserProblem } = require('../db/models')
module.exports = router

//get all problems
router.get('/', (req, res, next) => {
  Problem.findAll()
  .then(problems => res.json(problems))
  .catch(next)
})

//Get a single problem and its associated user
router.get('/:problemId/:userId', (req, res, next) => {
  Problem.findOne({
    where: {
      id: req.params.problemId,
    },
    include: [{model: Dialog}, {model: User, where: {id: req.params.userId}, through: { attributes: ['savedInput']} }]
  })
  .then(problem => res.json(problem))
  .catch(next)
})

//Update the UserProblem join table 
router.post('/:problemId/:userId', (req, res, next) => {
  UserProblem.findOne({
    where: {
      problemId: req.params.problemId,
      userId: req.params.userId
    }
  })
  .then(problem => {
    problem.update(req.body)
  })
    .then(data => {
    res.sendStatus(204)
  })
  .catch(next)

})

