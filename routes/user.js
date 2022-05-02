// External requires
const express = require("express");

// Importing middleware
const { userValidationRules, validate } = require("../middleware/validator");

// Importing methods for users
const userCtrl = require("../controllers/user");

// Creating express Router
const router = express.Router();

// Routing for users
router.post("/signup", userValidationRules(), validate, userCtrl.signUp);
router.post("/login", userValidationRules(), validate, userCtrl.logIn);

module.exports = router;
