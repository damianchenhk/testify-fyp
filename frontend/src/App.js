import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import {Provider} from "react-redux";
import store from "./store";

import './App.css';

import TopNavbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Course from "./components/dashboard/course/Course";
import AddCourse from "./components/dashboard/course/AddCourse";
import ViewCourse from "./components/dashboard/course/ViewCourse";
import AddTest from "./components/dashboard/test/AddTest";
import YourTest from "./components/dashboard/test/YourTest";
import DoTest from "./components/dashboard/test/DoTest";
import Feedback from "./components/dashboard/feedback/Feedback";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <Router>
          <div className="App">
            <TopNavbar/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <div className="main-page">
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/course" component={Course} />
                <PrivateRoute exact path="/viewcourse/:id" component={ViewCourse} />
                <PrivateRoute exact path="/addcourse" component={AddCourse} />
                <PrivateRoute exact path="/addtest/:id" component={AddTest} />
                <PrivateRoute exact path="/yourtests" component={YourTest} />
                <PrivateRoute exact path="/test/:id" component={DoTest} />
                <PrivateRoute exact path="/feedback/:id" component={Feedback} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
