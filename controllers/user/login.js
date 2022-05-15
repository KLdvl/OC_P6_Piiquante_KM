// External requires
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Model used
const User = require("../../models/User");

// Method for loging in with authentification confirmed via token
exports.logIn = (req, res, next) => {

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Mot de passe invalide" });
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
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
