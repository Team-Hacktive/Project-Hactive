/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Problem = db.model('problem')
const Dialog = db.model('dialog')

describe('Problem routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/problems', () => {
    let problem
    let dialogSuccess

    //for some reason, async-await here required installing babel-polyfill again
    //npm i -D babel-core babel-polyfill babel-preset-es2015 babel-preset-stage-0 babel-loader
    beforeEach(async() => {
      let prob = await Problem.create({
          name: 'Test Problem',
          prompt: 'This is a test problem, and this is the prompt for it',
          level: '1',
          progress: null
      })
      .then(createdProblem => {
        problem = createdProblem
      })
      let dialog = await Dialog.create({
          content: 'this is test content for the success dialog',
          category: 'success'
        })
        .then(dialog => dialog.setProblem(problem))
        .then(dialogWithProblem => {
          dialogSuccess = dialogWithProblem
        })
        //need to promise.all to make sure problem is available to be associated with dialog!
      return Promise.all([prob, dialog])
    })


    it('gets all the problems', () => {
      return request(app)
        .get('/api/problems')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('Test Problem')
        })
    })

    it('gets a single problem with associated dialogs', () => {
      return request(app)
      .get('/api/problems/1')
      .expect(200)
      .then(res => {
        expect(res.body.dialogs).to.be.an('array')
        expect(res.body.dialogs.length).to.equal(1)
        expect(res.body.dialogs[0].category).to.equal('success')
      })
    })
  })
})
