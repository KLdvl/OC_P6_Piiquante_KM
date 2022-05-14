// External requires
const express = require("express");

// Importing middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const { sauceValidationRules, validate } = require("../middleware/validator");

// Importing methods for sauce
const sauceController = require("../controllers/sauce");
const sauceControllerLike = require("../controllers/likes/like");
const sauceControllerDislike = require("../controllers/likes/dislike");

// Creating express Router
const router = express.Router();

// Routing for sauces
router.get("/", auth, sauceController.getSauces);
router.get("/:id", auth, sauceController.getOneSauce);
router.post("/", auth, sauceValidationRules(), validate, multer, sauceController.createSauce);
router.put("/:id", auth, sauceValidationRules(), validate, multer, sauceController.modifySauce);
router.delete("/:id", auth, multer, sauceController.deleteSauce);
router.post("/:id/like", auth, sauceControllerLike.likeSauce, sauceControllerDislike.dislikeSauce);

module.exports = router;
