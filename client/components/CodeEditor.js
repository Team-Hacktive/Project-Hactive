// import React, { Component } from 'react';
// import Draft, { Editor, EditorState} from 'draft-js';
// import CodeUtils from 'draft-js-code';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { Editor, EditorState} from 'draft-js';
import {logout} from '../store'
import AceEditor from 'react-ace'
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import axios from 'axios'

export default class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      code: ''
    }
  }

  onChange = (obj) => {
    this.setState({
      code: obj
    })
  }

  onSubmit = () => {
    return axios.post('/api/compile', this.state)
    .then(res => {
      console.log('client data', res)
    })
  }

  render () {
    console.log('state', this.state)
    return (
      <div className = "code-wrapper">
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="UNIQUE_ID_OF_DIV"
        onChange={this.onChange}
        fontSize={20}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={this.state.code}
        setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        }} />
      <button onClick = {this.onSubmit}>submit</button>
      </div>
    )
  }
}
