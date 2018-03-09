const expect = require('chai').expect

const {sum} = require('../src/sum')

describe('sum', () => {
  it('sum of 2 and 2 returns 4', () => {
    expect(sum(2, 2)).to.eql(4)
  })
  it('sum of 1 and 1 returns 2', () => {
    expect(sum(1, 1)).to.eql(2)
  })
})


// const {expect} = require('chai')


// describe('test', () => {
//   it('is a test', () => {
//     expect(JSON.parse(localStorage.getItem('code'))()).to.be.equal(2)
//   })
// })
