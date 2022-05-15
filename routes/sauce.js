// External requires
const express = require("express");

// Importing middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const { sauceValidationRules, validate } = require("../middleware/validator");

// Importing methods for sauce
const sauceControllerCreate = require("../controllers/sauce/create");
const sauceControllerRead = require("../controllers/sauce/read");
const sauceControllerUpdate = require("../controllers/sauce/update");
const sauceControllerDelete = require("../controllers/sauce/delete");
const sauceControllerLike = require("../controllers/sauce/likes/like");
const sauceControllerDislike = require("../controllers/sauce/likes/dislike");

// Creating express Router
const router = express.Router();

// Routing for sauces
router.get("/", auth, sauceControllerRead.getSauces);
router.get("/:id", auth, sauceControllerRead.getOneSauce);
router.post("/", auth, sauceValidationRules(), validate, multer, sauceControllerCreate.createSauce);
router.put("/:id", auth, sauceValidationRules(), validate, multer, sauceControllerUpdate.modifySauce);
router.delete("/:id", auth, multer, sauceControllerDelete.deleteSauce);
router.post("/:id/like", auth, sauceControllerLike.likeSauce, sauceControllerDislike.dislikeSauce);

module.exports = router;
