import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Customer from "./components/customer";
import Rental from "./components/rental";
import NotFound from "./components/not-found";
import MoviesNavbar from "./components/moviesNavbar";
import LoginForm from "./components/loginForm";
import Register from "./components/register";
import MovieForm from "./components/movieForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <MoviesNavbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/loginForm" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}></Route>
            <Route path="/customer" component={Customer}></Route>
            <Route path="/rental" component={Rental}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
