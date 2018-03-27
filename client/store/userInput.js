import axios from 'axios'
import user from './user';

//ACTION TYPES
const SAVE_USER_INPUT = 'SAVE_USER_INPUT'

//INITIAL STATE
const userInput = ''

//ACTION CREATORS
const saveUserInput = input => ({type: SAVE_USER_INPUT, input})

//THUNKS
export const postUserInput = (problemId, userId, input) =>{
	return (dispatch) => {
		axios.post(`/api/problems/${problemId}/${userId}`, input)
		.then(res => {
			dispatch(saveUserInput(input))
		})
	.catch(err => console.log(err))
	}
}

//REDUCER
export default function(state = userInput, action) {
  switch (action.type) {
    case SAVE_USER_INPUT:
      return action.input
    default:
      return state
  }
}
