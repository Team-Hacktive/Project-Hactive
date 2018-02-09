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

class Main extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      code: ''
    }
  }

  onChange = (obj) => {
    this.setState({
      code: obj
    })
  }

  render () {
    console.log('state', this.state)
    return (
      // <AceEditor
      //   mode="javascript"
      //   theme="monokai"
      //   height="50em"
      //   onChange={this.onChange}
      // />
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="UNIQUE_ID_OF_DIV"
        onChange={this.onChange}
        fontSize={20}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={`function add(a, b) { ${this.state.code} }`}
        setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        }}/>
    )
  }

    // <div>
    //   <h1>BOILERMAKER</h1>
    //   <nav>
    //     {
    //       isLoggedIn
    //         ? <div>
    //           {/* The navbar will show these links after you log in */}
    //           <Link to="/home">Home</Link>
    //           <a href="#" onClick={handleClick}>Logout</a>
    //         </div>
    //         : <div>
    //           {/* The navbar will show these links before you log in */}
    //           <Link to="/login">Login</Link>
    //           <Link to="/signup">Sign Up</Link>
    //         </div>
    //     }
    //   </nav>
    //   <hr />
    //   {children}
    // </div>
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
