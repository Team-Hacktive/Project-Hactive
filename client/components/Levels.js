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
    if (currentVal.id > accum.id && currentVal.UserProblem.completed) {
      accum = currentVal
    }
    return accum.id
  })
  return (

    <div>
      {
        //maps through all problems
        allProblems && allProblems.map(problem => {
          return (
            <div
              key={problem.id}
            >
            {/*if the problem is less than or equal to 1 + the largest completed problem, you can click it*/}
            <button disabled={problem.id <= largestProblemId + 1 ? false : true} >
              Name: {problem.name}
              Level: {problem.level}
              Problem Number: {problem.problemNumber}
            </button>
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
