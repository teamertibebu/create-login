import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import MyTextInput from './MyTextInput';

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <MyTextInput
          label="Username"
          name="username"
          type="text"
          placeholder="John Doe"
        />

        <MyTextInput label="Password" name="password" type="password" />

        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </Form>
    </Formik>
  );
};

export default SignIn;
