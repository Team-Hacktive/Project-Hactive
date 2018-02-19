import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'


const Levels = (props) => {
  //destructures props
  const {userProblems, allProblems} = props

//gets id of last (i.e. most advanced) completed problem
  const largestProblemId = userProblems.reduce((accum, currentVal) => {
    if (currentVal.id > accum.id && currentVal.completed) {
      accum = currentVal
    }
    return accum.id
  })


  //when mapping over the allProblems, have the conditional on whether or not its clickable be if the problem's id is less than or equal to the largestProblemId + 1

  return (

    <div>
      {
        //maps through all problems
        allProblems && allProblems.map(problem => {
          return (
            <div
              key={problem.id}
              clickable={problem.id <= largestProblemId + 1 ? 'true' : 'false'}
            >
              Name: {problem.name}
              Level: {problem.level}
              Problem Number: {problem.problemNumber}
            </div>
          )
        })
      }
    </div>
  )
}


export default Levels

  //creates object of user's problem names and completion statuses
  // const userProbStatuses = userProblems.map(problem => {
  //   const problemName = problem.name
  //   const isComplete = problem.UserProblem.completed
  //   return {[problemName]: isComplete}
  // })
