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

  //receiving code input as a prop from singleProblem once that is done loading from the db api call
  componentWillReceiveProps(nextprop){
    if(nextprop.codeInput && nextprop.codeInput.length){
      this.setState({code: nextprop.codeInput})
    }
  }

  onChange = (obj) => {
    this.setState({
      code: obj
    })
  }

  render() {
    const { problemId, userId, handleSave, codeInput } = this.props;
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
  )}
}

const mapState = (state, ownprops) => {
  return {
    codeInput: ownprops.codeInput,
    problemId: state.currentProblem.id,
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
