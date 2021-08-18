const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = require('express')();
const path = require('path');
const PORT = process.env.PORT || 9000;
const bodyParser = require('body-parser');
const chalk = require('chalk');
const util = require('util');
const bcrypt = require('bcryptjs');
const mongoPassword = process.env.MONGO_PASSWORD;
const connectionURI = `mongodb+srv://teamertibebu:${mongoPassword}@cluster0.yfpbe.mongodb.net/create-login?retryWrites=true&w=majority`;

mongoose
  .connect(connectionURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch((err) => {
    console.log('Connection error: ' + err);
  });

const db = mongoose.connection;

var findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  hashedPassword: String,
});

userSchema.plugin(findOrCreate);

const userModel = mongoose.model('User', userSchema);

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

app.post('/firebase', async (req, res) => {
  const { username, hashedPassword, email } = req.body;

  const exists = (await userModel.find({ username })).length;
  const userCreated =
    !exists &&
    (await new userModel({ username, email, hashedPassword }).save());
  return req.body.username.length > 0
    ? res.send({ isAuth: true })
    : res.send({ isAuth: false });
});

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});
