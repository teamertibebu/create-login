import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const WelcomePage = () => {
  return (
    <>
      <p>You must log in to view the page</p>
      <Link to="sign-up">
        <Button variant="contained" color="primary">
          Sign Up
        </Button>
      </Link>
      <Link to="sign-in">
        <Button variant="contained" color="primary">
          Log In
        </Button>
      </Link>
    </>
  );
};

export default WelcomePage;
