import axios from 'axios'

//ACTION TYPES
const GET_CURRENT_PROBLEM = 'GET_CURRENT_PROBLEM'

//INITIAL STATE
const currentProblem = []

//ACTION CREATORS
const getCurrentProblem = problem => ({type: GET_CURRENT_PROBLEM, problem})

//THUNKS
export const getCurrentProblemThunk = (problem) =>
  dispatch =>
    axios.get(`/api/problems/level/${problem.level}/problem/${problem.problemNumber}`)
    .then(res => {
      dispatch(getCurrentProblem(res.data))
    })
    .catch(err => console.log(err))

//REDUCER
export default function(state = currentProblem, action) {
  switch (action.type) {
    case GET_CURRENT_PROBLEM:
      return action.problem
    default:
      return state
  }
}
