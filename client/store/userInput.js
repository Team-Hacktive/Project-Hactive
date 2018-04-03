import axios from 'axios'
import user from './user';

//ACTION TYPES
const SAVE_USER_INPUT = 'SAVE_USER_INPUT'
const GET_USER_INPUT = 'GET_USER_INPUT'

//INITIAL STATE
const userInput = ''

//ACTION CREATORS
const saveUserInput = input => ({type: SAVE_USER_INPUT, input})
const getUserInput = input => ({type: GET_USER_INPUT, input})

//THUNKS
export const postUserInput = (problemId, userId, input) => {
	return (dispatch) => {
		axios.post(`/api/inputs/${problemId}/${userId}`, input)
		.then(res => {
			dispatch(saveUserInput(input))
		})
	.catch(err => console.log(err))
	}
}

export const getUserInputThunk = (problemId, userId) => {
	return (dispatch) => {
		axios.get(`/api/inputs/${problemId}/${userId}`)
		.then(input => {
			dispatch(getUserInput(input.data.savedInput))
		})
		.catch(err => console.log(err))
	}
}

//REDUCER
export default function(state = userInput, action) {
  switch (action.type) {
    case SAVE_USER_INPUT:
			return action.input
		case GET_USER_INPUT:
      return action.input
    default:
      return state
  }
}
