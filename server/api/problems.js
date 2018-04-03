const router = require('express').Router()
const { Problem, Dialog } = require('../db/models')
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
    include: [{model: Dialog}]
  })
  .then(problem => res.json(problem))
  .catch(next)
})
