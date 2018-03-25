const router = require('express').Router()
const { Problem, Dialog, User } = require('../db/models')
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

