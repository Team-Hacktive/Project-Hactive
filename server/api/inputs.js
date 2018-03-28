const router = require('express').Router()
const { UserProblem } = require('../db/models')
module.exports = router

//Get the User Input
router.get('/:problemId/:userId', (req, res, next) => {
  UserProblem.findOne({
    where: {
      problemId: req.params.problemId,
      userId: req.params.userId
    }
  })
  .then(input => res.json(input))
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
  .then(problem => { problem.update(req.body) })
  .then(data => { res.sendStatus(204) })
  .catch(next)
})

