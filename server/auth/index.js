const router = require('express').Router()
const {User, Problem} = require('../db/models')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
  },
  //gets all problems that user is associated with
  include: [{model: Problem}]
})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res, next) => {
  User.findOne({
    where: {
      id: req.user.id
    },
    //loads any problems associated with the user
    include: [{
      model: Problem
    }]
  })
  .then(user => res.json(user))
  .catch(next)
})

router.use('/google', require('./google'))
