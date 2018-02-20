import React from 'react'


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
            <button disabled={!(problem.id <= largestProblemId + 1)} >
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
