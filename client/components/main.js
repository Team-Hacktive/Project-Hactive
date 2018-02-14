import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import { logout, me } from "../store";
import CodeEditor from "./CodeEditor";
import UserHome from "./user-home";
import { Login, Signup } from "./auth-form";
import { Router } from "react-router";
import history from "../history";

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
// const Main = (props) => {
//   const {children, handleClick, isLoggedIn} = props

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "case"
    };
  }

  componentDidMount() {
    console.log("component did mount from main fired");
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, handleClick } = this.props;
    return (
      <div>
        {isLoggedIn ?
          <a href="#" onClick={handleClick}>Logout</a>
          :
          null
        }
        <Router history={history}>
          <div>
          {!isLoggedIn ?
            <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            </div>
            :
            null
          }
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {isLoggedIn && (
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/editor" component={CodeEditor} />
                  <Route path="/home" component={UserHome} />
                  <Route path="/" component={UserHome} />
                </Switch>
              )}
              <Route component={Login} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      console.log("loadinitialdata fired");
      dispatch(me());
    },
    handleClick() {
      dispatch(logout());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Main);

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
