import axios from 'axios'

//ACTION TYPES
const GET_CURRENT_PROBLEM = 'GET_CURRENT_PROBLEM'
const USER_PROBLEM_ASSOCIATED = 'USER_PROBLEM_ASSOCIATED'
const CLEAR_CURRENT_PROBLEM = 'CLEAR_CURRENT_PROBLEM'

//INITIAL STATE
const currentProblem = []

//ACTION CREATORS
const getCurrentProblem = problem => ({type: GET_CURRENT_PROBLEM, problem})
const userProblemAssociated = bool => ({type: USER_PROBLEM_ASSOCIATED, bool })
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

export const findOrCreateUserProblem = (problemId, userId) => {
  return (dispatch) => {
  axios.get(`/api/users/${userId}/${problemId}`)
  .then(res => {
    if(!res.data){
      //create association
      axios.post(`/api/users/${userId}/${problemId}`)
      .then(res => {
        dispatch(userProblemAssociated(res.data))
      })
      .catch(err => console.log(err))
    }else{
      dispatch(userProblemAssociated(res.data))
    }
    return 'done' 
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
    case USER_PROBLEM_ASSOCIATED:
      return state
    default:
      return state
  }
}
