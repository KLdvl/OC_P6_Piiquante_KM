const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");

router.get("/", sauceCtrl.getThings);
router.get("/:id", sauceCtrl.getOneThing);
router.post("/", sauceCtrl.createThing);
router.put("/:id", sauceCtrl.modifything);
router.delete("/:id", sauceCtrl.deleteThing);
router.post("/:id/like", sauceCtrl.likeThing);

module.exports = router;
