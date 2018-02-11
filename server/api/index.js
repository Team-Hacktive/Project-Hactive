const router = require('express').Router()
module.exports = router

// matches all requests to /api/{whatever}/
router.use('/users', require('./users'))
router.use('/problems', require('./problems'))
router.use('/dialogs', require('./dialogs'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
