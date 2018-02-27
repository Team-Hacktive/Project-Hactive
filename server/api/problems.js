const router = require('express').Router()
const { Problem, Dialog, User } = require('../db/models')
module.exports = router

//get all problems
router.get('/', (req, res, next) => {
  Problem.findAll()
  .then(problems => res.json(problems))
  .catch(next)
})

//get a specific problem with associated dialog
router.get('/level/:level/problem/:problemNumber', (req, res, next) => {
  Problem.findOne({
    where: {
      level: req.params.level,
      problemNumber: req.params.problemNumber
    },
    include: [{model: Dialog}, {model: User}]
  })
  .then(problem => res.json(problem))
  .catch(next)
})

