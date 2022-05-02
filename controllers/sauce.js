// External requires
const fs = require("fs");

// Model used
const Sauce = require("../models/Sauce");

// Method for getting all the sauces
exports.getSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

// Method for getting one sauce using Id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Method for creating a new sauce
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
};

// Method for modifying an existing sauce
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({ error: new Error("Sauce non trouvée") });
    }
    if (sauce.userId !== req.auth.userId) {
      return res
        .status(403)
        .json({ error: new Error("Requête non autorisée") });
    }
if(req.file) {
  const filename = sauce.imageUrl.split('/images/')[1];
  fs.unlink(`images/${filename}`, (err) => {
    if(err) throw err;
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
};

// Method for deleting a sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({ error: new Error("Sauce non trouvée") });
    }
    if (sauce.userId !== req.auth.userId) {
      return res
        .status(403)
        .json({ error: new Error("Requête non autorisée") });
    }
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, (err) => {
      if(err) throw err;
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée" }))
        .catch((error) => res.status(400).json({ error }));
    })
  })
    .catch(error => res.status(500).json({error}));
};

// Method for liking / disliking a sauce
exports.likeSauce = (req, res, next) => {
 if(req.body.like === 1) {
   Sauce.updateOne({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: req.body.userId}})
     .then(() => res.status(200).json({message: "Je like cette sauce"}))
     .catch((error) => res.status(400).json({error}))
 } else if (req.body.like === -1) {
   Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: req.body.userId}})
     .then(() => res.status(200).json({message: "Je dislike cette sauce"}))
     .catch((error) => res.status(400).json({error}))
 } else {
   Sauce.findOne({_id: req.params.id})
     .then(sauce => {
       if(sauce.usersLiked.includes(req.body.userId)) {
         Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}})
           .then(() => res.status(200).json({message: "Je retire mon like"}))
           .catch((error) => res.status(400).json({error}))
       } else if (sauce.usersDisliked.includes(req.body.userId)) {
         Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}})
           .then(() => res.status(200).json({message: "Je retire mon dislike"}))
           .catch((error) => res.status(400).json({error}))
       }
     })
     .catch((error) => res.status(400).json({error}))
 }
};
