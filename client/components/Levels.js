import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'


const Levels = (props) => {
  //destructures props
  const {userProblems, allProblems} = props

  //creates object of user's problem names and completion statuses
  const userProbStatuses = userProblems.map(problem => {
    const problemName = problem.name
    const isComplete = problem.UserProblem.completed
    return {[problemName]: isComplete}
  })
  return (

    <div>
      {
        //maps through all problems
        allProblems && allProblems.map(problem => {
          //sees if current problem is marked as "complete" in userProblemStatus array
          //if so, returned div has "true" as 'clickable' prop
          //THERE MUST BE A BETTER WAY TO DO THIS
        const clickable = userProbStatuses.filter(p => {
            return Object.keys(p)[0] === problem.name
          })
          return (
            <div key={problem.id} clickable={clickable}>
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
