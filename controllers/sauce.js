const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.getSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
  console.log("get sauces");
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
  console.log("get single sauce");
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée !" }))
    .catch((error) => res.status(400).json({ error }));
  console.log("post sauce");
};

exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({ error: new Error("Sauce non trouvée") });
    }
    if (sauce.userId !== req.auth.userId) {
      return res
        .status(401)
        .json({ error: new Error("Requête non autorisée") });
    }

if(req.file) {
  const filename = sauce.imageUrl.split('/images/')[1];
  fs.unlink(`images/${filename}`, () => {
    const sauceObject = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
      .catch((error) => res.status(400).json({ error }));
  })
} else {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
  .catch((error) => res.status(400).json({ error }));
}
  });
  console.log("put sauce");
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({ error: new Error("Sauce non trouvée") });
    }
    if (sauce.userId !== req.auth.userId) {
      return res
        .status(401)
        .json({ error: new Error("Requête non autorisée") });
    }

    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée" }))
        .catch((error) => res.status(400).json({ error }));
    })

  })
    .catch(error => res.status(500).json({error}));
  console.log("delete sauce");
};

exports.likeSauce = (req, res, next) => {
  console.log("like sauce");
};
