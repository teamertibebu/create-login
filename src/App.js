import {
  Route,
  Switch,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import './App.css';
import SignUp from './SignUp';
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
    console.log('now: ', stateRef.current);
    console.log('nowNow: ', authenticated);

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
          <p>You must log in to view the page</p>

          <ul>
            <Link to="sign-up">Sign Up</Link>
            <Button variant="contained" color="primary" onClick={login}>
              Log In
            </Button>
          </ul>
        </Route>
        <Route path="/sign-up">
          <SignUp fakeAuth={fakeAuth} />
        </Route>
      </Switch>
    </div>
  );
}

// const LogIn = () => {
//   const [redirectToReferrer, setRedirectToReferrer] = useState(false);

//   const login = () =>
//     fakeAuth.authenticate(() => {
//       setRedirectToReferrer(true);
//     });

//   if (redirectToReferrer === true) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div>
//       <p>You must log in to view the page</p>
//       <button onClick={login}>Log in</button>
//     </div>
//   );
// };

const Home = () => {
  return <p>Home Page</p>;
};

export default App;
