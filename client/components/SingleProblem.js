import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, getCurrentProblemThunk, findOrCreateUserProblem, clearCurrentProblem} from '../store'
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
		const {email, isLoggedIn, problem, params, userId} = this.props
		let codeInput = ''
		if(problem.users){
			codeInput = problem.users[0].UserProblem.savedInput
		}
    return (
			<div className='toc'>
				<h3>{problem ? problem.name : ''}</h3>
				<h4>{problem ? problem.prompt : ''}</h4>
				<Editor codeInput={codeInput}/>
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
  }
}

const mapDispatch = (dispatch) => {
  return {
     handleLogOut() {
      dispatch(logout())
		},
		loadProblem(problemId, userId) {
			dispatch(getCurrentProblemThunk(problemId, userId))
		},
		clearProblem(){
			dispatch(clearCurrentProblem())
		}
  }
}

export default connect(mapState, mapDispatch)(SingleProblem)

/**
 * PROP TYPES
 */


