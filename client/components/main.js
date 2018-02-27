import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import { logout, me, getAllProblemsThunk} from "../store";
import CodeEditor from "./CodeEditor";
import UserHome from "./user-home";
import { Login, Signup } from "./auth-form";
import { Router } from "react-router";
import history from "../history";
import TitlePage from './TitlePage'


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "case"
    };
  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, handleClick } = this.props;
    return (
      <div>
        <Router history={history}>
          <div className='titleScreen'>
          {!isLoggedIn ?
            //component that always says 'Hacktive' and 'credits' and conditionally renders a signup or login thing
            <div>
            <TitlePage/>
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
      dispatch(me());
      dispatch(getAllProblemsThunk())
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
