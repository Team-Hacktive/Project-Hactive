import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Levels from './Levels'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Levels', () => {
  let levels

  const userProblems = [
    {id: 1, name: 'Make a linked list', prompt: 'Make a singly linked list. You should be able to add and remove nodes from it', level: 1, problemNumber: 1}
  ]
  const allProblems = [
    {id: 1, name: 'Make a linked list', prompt: 'Make a singly linked list. You should be able to add and remove nodes from it', level: 1, problemNumber: 1},
    {id: 2, name: 'Remove the kth from last node', prompt: 'Oh no! The third node is corrupted. Remove it.', level: 1, problemNumber: 2}
  ]

  beforeEach(() => {
    levels = shallow(<Levels userProblems={userProblems} allProblems={allProblems} />)
  })

  it('renders all questions', () => {
    expect(levels.find('button')).to.have.length(2);
  })

})
