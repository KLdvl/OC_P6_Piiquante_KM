// External requires
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptojs = require("crypto-js");

// Model used
const User = require("../../models/User");

// Method for loging in with authentification confirmed via token
exports.logIn = (req, res) => {
  const {email, password} = req.body;
  //Crypting email
  const emailCrypted = cryptojs
    .HmacSHA256(email, process.env.CRYPTOJS_SECRET_KEY)
    .toString();

  User.findOne({ email: emailCrypted })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe invalide" });
          }
          return res
            .status(200)
            .json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
                expiresIn: "24h",
              }),
            });
        })
        .catch(error => res.status(500).json({error}).send(console.log(error)));
    })
    .catch(error => res.status(500).json({error}).send(console.log(error)));
};
