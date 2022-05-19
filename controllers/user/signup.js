// External requires
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");

// Model used
const User = require("../../models/User");

// Method for signing up with password hashing with bcrypt
exports.signUp = (req, res) => {
  const {email, password} = req.body;
  //Crypting email
  const emailCrypted = cryptojs
    .HmacSHA256(email, process.env.CRYPTOJS_SECRET_KEY)
    .toString();

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        email: emailCrypted,
        password: hash,
      });

      // Saving user to database
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch(error => res.status(400).json({error}).send(console.log(error)));
    })
    .catch(error => res.status(500).json({error}).send(console.log(error)));
};
