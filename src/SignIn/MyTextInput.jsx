import React from 'react';
import { useField } from 'formik';
import './test.css';

export default function MyTextInput({ label, ...props }) {
  const { id, name } = props;
  const [field, meta, helpers] = useField(name);
  const { touched, error } = meta;

  return (
    <div>
      <label htmlFor={id || name}>{label}</label>
      <input {...field} {...props} />
      {touched && error ? <div>{error}</div> : null}
    </div>
  );
}
