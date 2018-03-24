const router = require('express').Router()
const { Problem, Dialog, User } = require('../db/models')
module.exports = router

//get all problems
router.get('/', (req, res, next) => {
  Problem.findAll()
  .then(problems => res.json(problems))
  .catch(next)
})

router.get('/dialogs', (req, res, next) =>{
  Dialog.findAll()
  .then(dialogs => res.json(dialogs))
  .catch(next)
})

//get a specific problem with associated dialog
router.get('/:problemId', (req, res, next) => {
  Problem.findById(req.params.problemId)
  .then(problem => res.json(problem))
  .catch(next)
})

