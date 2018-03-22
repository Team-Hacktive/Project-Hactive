import React from 'react';
import { NavLink } from 'react-router-dom'


const Levels = (props) => {
  //destructures props
  const { userProblems, allProblems } = props

  //gets id of last (i.e. most advanced) completed problem
  const largestProblemId = userProblems.length && userProblems.reduce((accum, currentVal) => {
    if (currentVal.id > accum.id && currentVal.UserProblem.completed) {
      accum = currentVal
    }
    return accum.id
  })

  console.log('largestProblemId???', largestProblemId)
  return (
    <div>
      {
        //maps through all problems
        allProblems.length && allProblems.map(problem => {
          console.log('what is this', problem);
          return (
            <div key={problem.id}>
              {/*if the problem is less than or equal to 1 + the largest completed problem, you can click it*/}
              <NavLink to={`/singleProblem/${problem.id}`}>
                <button disabled={problem.id < largestProblemId.id} >
                  Name: {problem.name}
                  Level: {problem.level}
                  Problem Number: {problem.problemNumber}
                </button>
              </NavLink>
            </div>
          )
        })
      }
    </div >
  )
}


export default Levels
