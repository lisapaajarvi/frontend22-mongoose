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
  // STEG 1: KONTROLLERA OM ANVÄNDAREN REDAN FINNS (OCH SKICKA TILLBAKA SVAR I SÅ FALL)
  const existingUser = await UserModel.findOne({ email: req.body.email });
  if (existingUser) {
      return res.status(400).json("Användaren redan registrerad");
  }
  // STEG 2: KRYPTERA LÖSENORD
  let hashedPassword = crypto.SHA3(req.body.password).toString();
  newUser.password = hashedPassword;

  // STEG 3: SKAPA NY ANVÄNDARE OCH LÄGGA TILL I DATABASEN
  const addedUser = await UserModel.create(newUser)
  // STEG 4: SKICKA TILLBAKA STATUSKOD/SVAR
  res.status(201).json(addedUser)
})

module.exports = router;
