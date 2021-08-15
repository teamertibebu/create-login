import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
const bcrypt = require('bcryptjs');

const useStyles = makeStyles((theme) => ({
  container: {
    border: '1px solid lightgrey',
    width: 'auto',
    display: 'inline-block',
  },
  item: {
    margin: '10px',
  },
}));

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const userInfo = { username, hashedPassword, email };

  const classes = useStyles();

  useEffect(() => {
    console.log('first');
    axios.post('/firebase', userInfo).then();

    return () => {
      console.log('second');
    };
  }, [hashedPassword]);

  const handleFormUpdate = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    const inputs = {
      username: setUsername,
      email: setEmail,
      password: setPassword,
      'confirm-password': setPasswordConfirmation,
    };

    inputs[inputName](inputValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    (async () => {
      if (password === passwordConfirmation) {
        const encrypted = await bcrypt.hashSync(password, bcrypt.genSaltSync());
        setHashedPassword(encrypted);
      } else {
        console.log('Passwords do not match.');
      }
    })();
  };

  return (
    <div>
      <Grid container justifyContent="center" className={classes.container}>
        <Grid item>
          <div>Sign Up Form</div>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid item className={classes.item}>
            <TextField
              label="Username"
              name="username"
              variant="filled"
              size="small"
              autoFocus
              onChange={handleFormUpdate}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              label="Email"
              name="email"
              variant="filled"
              size="small"
              onChange={handleFormUpdate}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              label="Password"
              name="password"
              variant="filled"
              size="small"
              onChange={handleFormUpdate}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              label="Confirm Password"
              name="confirm-password"
              variant="filled"
              size="small"
              onChange={handleFormUpdate}
            />
          </Grid>
          <Grid item className={classes.item}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default SignUp;
