import axios from 'axios'

//ACTION TYPES
const GET_DIALOGS = 'GET_DIALOGS'

//INITIAL STATE
const dialogs = []

//ACTION CREATORS
const getDialogs = dialogsAction => ({type: GET_DIALOGS, dialogsAction})

//THUNKS
export const getDialogsThunk = () =>
  dispatch =>
    axios.get(`/api/problems/dialogs`)
    .then(res => {
        console.log('dialogs', res.data)
      dispatch(getDialogs(res.data))
    })
    .catch(err => console.log(err))

//REDUCER
export default function(state = dialogs, action) {
  switch (action.type) {
    case GET_DIALOGS:
      return action.dialogsAction
    default:
      return state
  }
}
