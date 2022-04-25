const User = require("../models/User");

exports.signUp = (req, res, next) => {
  const user = new User({
    ...req.body,
  });
  user
    .save()
    .then(() => res.status(201).json({ message: "Utilisateur créé!" }))
    .catch((error) => res.status(400).json({ error }));
  console.log("post signup");
};

exports.logIn = (req, res, next) => {
  console.log("post login");
};
