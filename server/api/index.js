const router = require('express').Router()
module.exports = router

router.use('/users', require('./users')) // matches all requests to /api/users/

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
