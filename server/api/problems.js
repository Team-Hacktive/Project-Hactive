const router = require('express').Router()
const { Problem, Dialog, User, UserProblem } = require('../db/models')
module.exports = router

//get all problems
router.get('/', (req, res, next) => {
  Problem.findAll()
  .then(problems => res.json(problems))
  .catch(next)
})

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

router.post('/:problemId/:userId', (req, res, next) => {
  console.log('I reached here', req.params.problemId, req.params.userId, req.body)
  // Problem.findById(req.params.problemId)
  // .then(problem => {
  //   problem.getUsers({ where: {userId: req.params.userId}, through: { UserProblem } })
  //   // problem.setUsers({userId: req.params.userId, savedInput: req.body})
  // })
  UserProblem.findOne({
    where: {
      problemId: req.params.problemId,
      userId: req.params.userId
    }
    // ,
    // include: [{model: User, where: {id: req.params.userId}, through: { attributes: ['savedInput']} }]
  })
  .then(problem => {
    console.log('saved alright', req.body)
    problem.update(req.body)
  })
    .then(data => {
    res.sendStatus(204)
  })
  .catch(next)

})

