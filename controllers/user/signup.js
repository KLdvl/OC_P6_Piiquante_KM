// External requires
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");

// Model used
const User = require("../../models/User");

// Method for signing up with password hashing with bcrypt
exports.signUp = async (req, res) => {
  try {
    const {email, password} = await req.body;

    //Crypting email
    const emailCrypted = await cryptojs
      .HmacSHA256(email, process.env.CRYPTOJS_SECRET_KEY)
      .toString();

    bcrypt
      .hash(password, 10)
      .then(async (hash) => {
        await User.create({
          email: emailCrypted,
          password: hash,
        });
        res.status(201).json({message: "Utilisateur créé"})
      })
  } catch (err) {
    res.status(500).json({error: err})
  }
}


