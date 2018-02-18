import axios from 'axios'

//ACTION TYPES
const GET_ALL_PROBLEMS = 'GET_ALL_PROBLEMS'

//INITIAL STATE
const allProblems = []

//ACTION CREATORS
const getAllProblems = problems => ({type: GET_ALL_PROBLEMS, problems})

//THUNKS
export const getAllProblemsThunk = () =>
  dispatch =>
    axios.get('/api/problems')
    .then(res => {
      dispatch(getAllProblems(res.data))
    })
    .catch(err => console.log(err))

//REDUCER
export default function(state = allProblems, action) {
  switch (action.type) {
    case GET_ALL_PROBLEMS:
      return action.problems
    default:
      return state
  }
}
