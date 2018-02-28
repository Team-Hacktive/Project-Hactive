import React from 'react'
import {Login, Signup } from './auth-form'
import { Switch, Route, Link } from "react-router-dom";


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
      <div style={{color: 'red'}}>delete me</div>
    )
  }
}

export default AuthHelper
