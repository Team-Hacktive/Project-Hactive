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

    beforeEach(async () => {

      problem = await Problem.create({
        name: 'Test Problem',
        prompt: 'This is a test problem, and this is the prompt for it',
        level: '1',
        progress: null
      })

      dialogSuccess = await Dialog.create({
        content: 'this is test content for the success dialog',
        category: 'success'
      })
      .then(dialog => dialog.setProblem(problem))

      return Promise.all([problem, dialogSuccess])
    })

    it('is a test, to begin with', () => {
      console.log("!!!!!!!!!!!!!!!!!!", dialogSuccess)
    })


  })
})
