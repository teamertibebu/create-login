const express = require('express');
const app = require('express')();
const path = require('path');
const PORT = process.env.PORT || 9000;
const bodyParser = require('body-parser');
const chalk = require('chalk');
const util = require('util');
const { resolveSoa } = require('dns');

const log = (...params) => {
  console.log(
    chalk.blue(
      util.inspect(params, {
        showHidden: false,
        depth: null,
      })
    )
  );
};

app.use(express.static(path.join(__dirname, 'build', 'index.html')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/firebase', (req, res) => {
  const { username, hashedPassword: pw, email } = req.body;
  console.log('inside', req.body);
  return req.body.username.length > 0
    ? res.send({ isAuth: true })
    : res.send({ isAuth: false });
  // res.send({ isAsuth: true });
});

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});
