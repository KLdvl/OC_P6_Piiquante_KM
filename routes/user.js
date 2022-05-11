// External requires
const express = require("express");
const bouncer = require("express-bouncer")(30000, 120000, 3)

// Importing middleware
const { userValidationRules, validate } = require("../middleware/validator");

// Importing methods for users
const userCtrl = require("../controllers/user");

// Creating express Router
const router = express.Router();

// Custom error message for bouncer
bouncer.blocked = function (req, res, next, remaining) {
  res.status(429).json({message: "Too many requests have been made. Please wait " + remaining/1000 + " seconds."});
};

// Routing for users
router.post("/signup", userValidationRules(), validate, userCtrl.signUp);
router.post("/login", bouncer.block, userValidationRules(), validate, userCtrl.logIn);

module.exports = router;
