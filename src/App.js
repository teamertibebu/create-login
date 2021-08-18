import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn/SignIn';
import WelcomePage from './WelcomePage';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';

function App() {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const history = useHistory();
  const { state } = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const stateRef = useRef();

  const fakeAuth = {
    authenticate(cb) {
      setAuthenticated((state) => {
        stateRef.current = !state;
        return !state;
      });
      cb();
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100); // fake async
    },
  };

  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true);
    });

    if (stateRef.current) {
      return history.push('/');
    } else {
      console.log('black');
    }
  };

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() => {
          return authenticated ? <Component /> : <Redirect to="/welcome" />;
        }}
      />
    );
  };

  return (
    <div className="App">
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route path="/welcome">
          <WelcomePage />
        </Route>
        <Route path="/sign-up">
          <SignUp fakeAuth={fakeAuth} />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
      </Switch>
    </div>
  );
}

const Home = () => {
  return <p>Home Page</p>;
};

export default App;
