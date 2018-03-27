import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import problems from './problems'
import currentProblem from './currentProblem'
import userInput from './userInput'

const reducer = combineReducers({user, problems, currentProblem, userInput})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './problems'
export * from './currentProblem'
export * from './userInput'
