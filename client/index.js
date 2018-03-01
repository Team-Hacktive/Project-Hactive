import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Main from './components/main'
import {Router} from 'react-router'
import history from './history'


ReactDOM.render(
  <Provider store={store}>
  <Router history={history} >
    <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
)
