import axios from 'axios'

//ACTION TYPES
const SAVE_USER_INPUT = 'SAVE_USER_INPUT'

//INITIAL STATE
const userInput = ''

//ACTION CREATORS
const saveUserInput = input => ({type: SAVE_USER_INPUT, input})

//THUNKS
export const postUserInput = (input) =>
  dispatch =>
    axios.post(``)
    .then(res => {
        console.log('data is posted', red.data)
    //   dispatch(getCurrentProblem(res.data))
    })
    .catch(err => console.log(err))

//REDUCER
export default function(state = userInput, action) {
  switch (action.type) {
    case SAVE_USER_INPUT:
      return action.input
    default:
      return state
  }
}
