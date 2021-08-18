import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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

const SignUp = ({ fakeAuth }) => {
  const history = useHistory();
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    email: '',
    passwordConfirmation: '',
    hashedPassword: '',
  });

  useEffect(() => {
    const { password, passwordConfirmation, ...userData } = userInfo;

    axios.post('/firebase', userData).then(({ data: { isAuth } }) => {
      return isAuth ? fakeAuth.authenticate(() => history.push('/')) : null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.hashedPassword]);

  const handleStateUpdate = (e) => {
    const stateName = e.target.name;
    const stateUpdateValue = e.target.value;
    const stateToUpdate = { [stateName]: stateUpdateValue };
    const updatedState = Object.assign({}, userInfo, stateToUpdate);
    setUserInfo(updatedState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { password, passwordConfirmation } = userInfo;

    (async () => {
      if (password === passwordConfirmation) {
        // const salt = await bcrypt.genSaltSync();
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashStateUpdate = Object.assign({}, userInfo, {
          hashedPassword: hashedPassword,
        });
        setUserInfo(hashStateUpdate);
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
              onChange={handleStateUpdate}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              label="Email"
              name="email"
              variant="filled"
              size="small"
              onChange={handleStateUpdate}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              label="Password"
              name="password"
              variant="filled"
              size="small"
              onChange={handleStateUpdate}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              label="Confirm Password"
              name="passwordConfirmation"
              variant="filled"
              size="small"
              onChange={handleStateUpdate}
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
