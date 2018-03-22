import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import Levels from './Levels'
import Editor from './CodeEditor'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
//   const {email, isLoggedIn, handleClick, userProblems, allProblems} = props
  console.log("userhome renders with these props", props)
  return (
    <div className='toc'>
      <a href="#" onClick={handleClick}>Logout</a>
      <h3>Welcome, {email}</h3>
      <Editor />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // storeProps: state,
    // currentPrblem: state,
    userProblems: state.user.problems,
    allProblems: state.problems,
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}


export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

