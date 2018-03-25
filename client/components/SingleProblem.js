import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, getCurrentProblemThunk, findOrCreateUserProblem} from '../store'
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
		this.props.loadProblem(this.props.params, this.props.userId)
	}

  render(){
		const {email, isLoggedIn, problem, params, userId} = this.props
    return (
			<div className='toc'>
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
		params: ownprops.match.params.id,
		problem: state.currentProblem,
    isLoggedIn: !!state.user.id,
		email: state.user.email,
		userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
     handleLogOut() {
      dispatch(logout())
		},
		loadProblem(id, userId) {
			// dispatch(findOrCreateUserProblem(id, userId))
			// .then(res => dispatch(getCurrentProblemThunk(id, userId)))
			// .catch(err=> console.log(err))
			dispatch(getCurrentProblemThunk(id, userId))
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

