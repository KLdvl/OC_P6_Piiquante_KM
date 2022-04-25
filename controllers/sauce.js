const Sauce = require("../models/Sauce");

exports.getThings = (req, res, next) => {
  console.log("get sauces");
};

exports.getOneThing = (req, res, next) => {
  console.log("get single sauce");
};

exports.createThing = (req, res, next) => {
  console.log("post sauce");
};

exports.modifyThing = (req, res, next) => {
  console.log("put sauce");
};

exports.deleteThing = (req, res, next) => {
  console.log("delete sauce");
};

exports.likeThing = (req, res, next) => {
  console.log("like sauce");
};
