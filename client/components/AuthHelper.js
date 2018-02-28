import React from 'react'
import {Login, Signup } from './auth-form'

const AuthHelper = (props) => {
  if (props.loginOrSignup === 'login') {
    return (
      <Login />
    )
  } else if (props.loginOrSignup === 'signup') {
    return (
      <Signup />
    )
  } else {
    return (
      <div />
    )
  }
}

export default AuthHelper
