const router = require('express').Router()
const path = require('path')
const { DockerSandbox } = require('../../DockerSandbox')

module.exports = router

router.post('/', (req, res) => {
  const codeFilePath = path.join(__dirname, '..', '..', '/client', '/test', '/src' )
  const rootDirContainer = path.join(__dirname, '..', '..', '/client', '/test')

  let dockerSandbox = new DockerSandbox(codeFilePath, rootDirContainer, req.body.code)

  dockerSandbox.run(function(data) {
    console.log('data', data)
    res.send(data)
  })
})
