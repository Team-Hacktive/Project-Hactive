import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'


const Levels = (props) => {
  console.log("levels props", props)
  const {problems} = props
  return (
    <div>
      {
        problems && problems.map(problem => {
          return (
            <div key={problem.id}>
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
