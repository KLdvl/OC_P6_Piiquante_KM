const Sauce = require("../../models/Sauce");

// Method for liking / disliking a sauce
exports.likeSauce = (req, res, next) => {
  if(req.body.like === 1) {
    Sauce.updateOne({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: req.body.userId}})
      .then(() => res.status(200).json({message: "Je like cette sauce"}))
      .catch(error => res.status(400).json({error}))
  } else if (req.body.like === -1) {
    Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: req.body.userId}})
      .then(() => res.status(200).json({message: "Je dislike cette sauce"}))
      .catch(error => res.status(400).json({error}))
  } else {
    Sauce.findOne({_id: req.params.id})
      .then(sauce => {
        if(sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}})
            .then(() => res.status(200).json({message: "Je retire mon like"}))
            .catch(error => res.status(400).json({error}))
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}})
            .then(() => res.status(200).json({message: "Je retire mon dislike"}))
            .catch(error => res.status(400).json({error}))
        }
      })
      .catch(error => res.status(400).json({error}))
  }
};
