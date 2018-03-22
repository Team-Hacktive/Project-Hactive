import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import Levels from './Levels'
import Editor from './CodeEditor'

/**
 * COMPONENT
 */
class SingleProblem extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

  render(){
    console.log("singleProblem renders with these props", this.props)
    const {email, isLoggedIn, handleClick, userProblems, allProblems, params} = this.props
    return (
        <div className='toc'>
          {/* <a href="#" onClick={handleClick}>Logout</a> */}
          <h3>Welcome, {email}</h3>
          <Editor />
        </div>
      )
  }
  
}

/**
 * CONTAINER
 */
const mapState = (state, ownprops) => {
  return {
    params: ownprops,
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

export default connect(mapState, mapDispatch)(SingleProblem)

/**
 * PROP TYPES
 */
SingleProblem.propTypes = {
  email: PropTypes.string
}

