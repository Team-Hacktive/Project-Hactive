import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, getCurrentProblemThunk, getDialogsThunk} from '../store'
import { NavLink } from 'react-router-dom'
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

	componentDidMount(){
		//load problem from the database
		this.props.loadProblem(this.props.params.match.params.id)
	}

  render(){
		const {email, isLoggedIn, problem, params} = this.props
    return (
			<div className='toc'>
				{/* <a href="#" onClick={handleClick}>Logout</a> */}
				<h3>{problem ? problem.name : ''}</h3>
				<h4>{problem ? problem.prompt : ''}</h4>
				<Editor />
				<NavLink to={'/'}>
          <button>Go Back Home</button>
        </NavLink>
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
		problem: state.currentProblem,
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

const mapDispatch = (dispatch) => {
  return {
     handleLogOut() {
      dispatch(logout())
		},
		loadProblem(id) {
			dispatch(getCurrentProblemThunk(id))
			dispatch(getDialogsThunk())
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

