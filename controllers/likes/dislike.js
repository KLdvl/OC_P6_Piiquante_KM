const Sauce = require("../../models/Sauce");

exports.dislikeSauce = (req, res, next) => {

  // Method for disliking a sauce
  if (req.body.like === -1) {
    return Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: req.body.userId}})
      .then(() => res.status(200).json({message: "Je dislike cette sauce"}))
      .catch(error => res.status(400).json({error}))
  }

  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      // Method to withdraw dislike when sauce is disliked
      if (sauce.usersDisliked.includes(req.body.userId)) {
        return Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}})
          .then(() => res.status(200).json({message: "Je retire mon dislike"}))
          .catch(error => res.status(400).json({error}))
      }
    })
    .catch(error => res.status(400).json({error}))
};
