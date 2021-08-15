import React, { useState, useEffect } from 'react';
const bcrypt = require('bcryptjs');

const useHash = (password) => {
  const [hashedPassword, setHashedPassword] = useState();

  const setHash = (password) => {
    const encrypted = bcrypt.hashSync(password, bcrypt.genSaltSync());

    setHashedPassword(encrypted);
  };
  console.log('hash: ', hashedPassword);
  useEffect(() => {
    setHash(password);
  });
  return hashedPassword;
};

export default useHash;
