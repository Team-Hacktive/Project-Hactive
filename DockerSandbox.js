const path = require('path')
const fs = require('fs')
const Promise = require('bluebird')
const writeFile = Promise.promisify(fs.writeFile)
const readFile = Promise.promisify(fs.writeFile)
const statFile = Promise.promisify(fs.stat)
const exec = Promise.promisify(require('child_process').exec);

let DockerSandbox = function (codeFilePath, rootDirContainer, code) {
  this.codeFilePath = codeFilePath
  this.rootDirContainer = rootDirContainer
  this.code = code
}

DockerSandbox.prototype.run = function (successCallBack) {
  let secondsLeft = 15
  writeFile(path.join(this.codeFilePath, 'sum.js'), this.code)
  .then(() => {
    console.log('file-written')
    return exec(`docker build -t davidko562/add ${path.join(__dirname, 'client', 'test')}`)
  })
  .then(() => {
    let checkFileInterval = setInterval(() => {
      checkFileExist(path.join(__dirname, 'client', 'test', 'test-results.xml'))
      .then(exists => {
        console.log('exists???', exists)
        if (exists && secondsLeft) {
          let data = fs.readFileSync(path.join(__dirname, 'client', 'test', 'test-results.xml'), 'utf8')
            console.log('file found!')
            clearInterval(checkFileInterval)
            successCallBack(data)
        } else if (!exists && secondsLeft) {
          secondsLeft--
        } else {
          console.log('stackoverFlow!')
          clearInterval(checkFileInterval)
          successCallBack('stackoverflow!')
        }
      })
    }, 1000)
    console.log('rootdircontainer!', this.rootDirContainer)
    return exec(`docker run --name addcontainer -v ${this.rootDirContainer}:/testDockerContainer -w "/testDockerContainer"  davidko562/add npm run test`)
  })
  .then(() => {
    console.log('finished!')
  })
}

function checkFileExist(filename) {
  console.log('fileexistfunc called')
  return new Promise(resolve => {
    fs.stat(filename, function(err, stat) {
      if (!err) {
          console.log('File exists');
          resolve(true)
      } else if (err.code === 'ENOENT') {
          // file does not exist
          resolve(false)
      } else {
          console.log('Some other error: ', err.code);
          resolve(false)
      }
    })
  })
}


module.exports = {
  DockerSandbox
}
