import React, { Component } from 'react';
import Draft, { Editor, EditorState} from 'draft-js';
import CodeUtils from 'draft-js-code';

export class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.props.editorState
    };
  }

  // handleKeyCommand = (command) => {
  //   const { editorState } = this.state;
  //   let newState;

  //   if (CodeUtils.hasSelectionInBlock(editorState)) {
  //     newState = CodeUtils.handleKeyCommand(editorState, command);
  //   }

  //   if (!newState) {
  //     newState = RichUtils.handleKeyCommand(editorState, command);
  //   }

  //   if (newState) {
  //     this.onChange(newState);
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // }

  // keyBindingFn = (evt) => {
  //   const { editorState } = this.state;
  //   if (!CodeUtils.hasSelectionInBlock(editorState)) return Draft.getDefaultKeyBinding(evt);

  //   const command = CodeUtils.getKeyBinding(evt);

  //   return command || Draft.getDefaultKeyBinding(evt);
  // }

  // handleReturn = (evt) => {
  //   const { editorState } = this.state;
  //   if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

  //   this.onChange(CodeUtils.handleReturn(evt, editorState));
  //   return 'handled';
  // }

  // onTab = (evt) => {
  //   const { editorState } = this.state;
  //   if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

  //   this.onChange(CodeUtils.onTab(evt, editorState));
  //   return 'handled';
  // }

  render() {

    console.log('WHAT IS THIS', this.state)

    return (
      <Editor
        editorState={this.props.editorState}
        onChange={this.props.onChange}
        // keyBindingFn={this.keyBindingFn}
        // handleKeyCommand={this.handleKeyCommand}
        // handleReturn={this.handleReturn}
        // onTab={this.onTab}
      />
    );
  }
}
