import axios from 'axios'

//ACTION TYPES
const SAVE_USER_INPUT = 'SAVE_USER_INPUT'

//INITIAL STATE
const userInput = ''

//ACTION CREATORS
const saveUserInput = input => ({type: SAVE_USER_INPUT, input})

//THUNKS
export const findOrCreateUserProblem = (problemId, userId) => {
    dispatch =>
    axios.get(`/api/users/${userId}/${problemId}`)
    .then(res => {
        console.log('data is posted', res.data)
        if(!res.data){
            //create association
            axios.post(`/api/users/${userId}/${problemId}`)
            //add user input to new association
            .then(res => console.log('association created'))
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
}

export const postUserInput = (userId, problemId, input) =>{
    console.log('i was saved')
    dispatch =>
    axios.get(`/api/users/${userId}/${problemId}`)
    .then(res => {
        console.log('data is posted', res.data)
        if(!res.data){
            //create association
            axios.post(`/api/users/${userId}/${problemId}`)
            //add user input to new association
            .then(res => {

            })
            .catch(err => console.log(err))
        }else{
            //add user input to existing association
        }
    })
    .catch(err => console.log(err))
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
