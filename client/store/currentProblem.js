import axios from 'axios'

//ACTION TYPES
const GET_CURRENT_PROBLEM = 'GET_CURRENT_PROBLEM'
const CLEAR_CURRENT_PROBLEM = 'CLEAR_CURRENT_PROBLEM'

//INITIAL STATE
const currentProblem = []

//ACTION CREATORS
const getCurrentProblem = problem => ({type: GET_CURRENT_PROBLEM, problem})
export const clearCurrentProblem = () => ({type: CLEAR_CURRENT_PROBLEM})

//THUNKS
export const getCurrentProblemThunk = (problemId, userId) => {
  return (dispatch) => {
    axios.get(`/api/problems/${problemId}/${userId}`)
    .then(res => {
      dispatch(getCurrentProblem(res.data))
    })
    .catch(err => console.log(err))
  }
}

//REDUCER
export default function(state = currentProblem, action) {
  switch (action.type) {
    case GET_CURRENT_PROBLEM:
      return action.problem
    case CLEAR_CURRENT_PROBLEM:
      return []
    default:
      return state
  }
}
