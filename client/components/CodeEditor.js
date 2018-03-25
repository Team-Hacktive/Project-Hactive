// import React, { Component } from 'react';
// import Draft, { Editor, EditorState} from 'draft-js';
// import CodeUtils from 'draft-js-code';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Editor, EditorState } from 'draft-js';
import { logout, postUserInput } from '../store'
import AceEditor from 'react-ace'
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      code: `function add(a, b) {}`
    }
  }

  componentDidMount(){
    if(this.props.savedInput && this.props.savedInput.length){
      this.setState({code: this.props.savedInput})
    }
  }

  onChange = (obj) => {
    this.setState({
      code: obj
    })
  }

  render() {
    const { problemId, userId, handleSave,savedInput } = this.props;
    return (
      <div>
        <div>
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
        </div>
        <button onClick={() => handleSave(problemId, userId, {savedInput: this.state.code})}>Save</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    savedInput: state.currentProblem.users ? state.currentProblem.users[0].UserProblem.savedInput : '',
    problemId: state.currentProblem ? state.currentProblem.id : null,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleSave(problemId, userId, input) {
      dispatch(postUserInput(problemId, userId, input));
    }
  };
};

export default connect(mapState, mapDispatch)(CodeEditor);
