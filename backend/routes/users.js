var express = require('express');
var router = express.Router();
const crypto = require('crypto-js');
const UserModel = require('../models/userModel');

router.get('/', async function(req, res) {
  const users = await UserModel.find({});
  res.status(200).json(users);
});

router.post('/', async function(req, res) {

  let newUser = { email: req.body.email, username: req.body.username }
  
  // KRYPTERA LÖSENORD
  let hashedPassword = crypto.SHA3(req.body.password).toString();
  newUser.password = hashedPassword;

  //LÄGGA IN NY USER I DATABASEN
  const addedUser = await UserModel.create(newUser)
  res.status(201).json(addedUser)
})

module.exports = router;
