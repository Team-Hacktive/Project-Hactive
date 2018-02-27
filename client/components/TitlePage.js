import React from 'react'
import {Login, Signup } from './auth-form'
import { Switch, Route, Link } from "react-router-dom";


export default class Titleage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      something: 'for later'
    }
  }
  render() {
    return (
      <div>a test {this.state.something}
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    )
  }
}
