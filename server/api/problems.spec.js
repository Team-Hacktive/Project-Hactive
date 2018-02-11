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
    const problem = Problem.create({
      id: '1',
      name: 'Test Problem',
      prompt: 'This is a test problem, and this is the prompt for it',
      level: '1',
      progress: 'null'

    })
    const dialogSuccess = Dialog.create({

    })


  })
})
