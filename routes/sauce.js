// External requires
const express = require("express");

// Importing middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const { sauceValidationRules, validate } = require("../middleware/validator");

// Importing methods for sauce
const {createSauce} = require("../controllers/sauce/create");
const {readSauces, readOneSauce} = require("../controllers/sauce/read");
const {updateSauce} = require("../controllers/sauce/update");
const {deleteSauce} = require("../controllers/sauce/delete");
const {likeSauce} = require("../controllers/sauce/likes/like");
const {dislikeSauce} = require("../controllers/sauce/likes/dislike");

// Creating express Router
const router = express.Router();

// Routing for sauces
router.post("/", auth, multer, createSauce);
router.get("/", auth, readSauces);
router.get("/:id", auth, readOneSauce);
router.put("/:id", auth, multer, updateSauce);
router.delete("/:id", auth, multer, deleteSauce);
router.post("/:id/like", auth, likeSauce, dislikeSauce);

module.exports = router;
