import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, getCurrentProblemThunk, getUserInputThunk} from '../store'
import { NavLink } from 'react-router-dom'
import Levels from './Levels'
import Editor from './CodeEditor'
import axios from 'axios'

/**
 * COMPONENT
 */
class SingleProblem extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount(){
		//Find or create user <-> problem association in UserProblem table 
		axios.get(`/api/users/${this.props.userId}/${this.props.problem.id}`)
		.then(res => {
			if(!res.data){
				//create association
				axios.post(`/api/users/${userId}/${problemId}`)
				.then(res => {
					dispatch(userProblemAssociated(res.data))
				})
			}})
		.catch(err => console.log(err))

		this.props.loadProblem(this.props.params, this.props.userId)
	}

  render(){
		const {email, isLoggedIn, problem, params, userId, userInput} = this.props
    return (
			<div className='toc'>
				<h3>{problem ? problem.name : ''}</h3>
				<h4>{problem ? problem.prompt : ''}</h4>
				<Editor userInput={userInput}/>
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
		params: parseInt(ownprops.match.params.id),
		problem: state.currentProblem,
    isLoggedIn: !!state.user.id,
		email: state.user.email,
		userId: state.user.id,
		userInput: state.userInput
  }
}

const mapDispatch = (dispatch) => {
  return {
     handleLogOut() {
      dispatch(logout())
		},
		loadProblem(problemId, userId) {
			dispatch(getUserInputThunk(problemId, userId))
			dispatch(getCurrentProblemThunk(problemId, userId))
		}
  }
}

export default connect(mapState, mapDispatch)(SingleProblem)

/**
 * PROP TYPES
 */


