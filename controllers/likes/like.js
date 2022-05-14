const Sauce = require("../../models/Sauce");

exports.likeSauce = (req, res, next) => {

  // Method for liking a sauce
  if(req.body.like === 1) {
    return Sauce.updateOne({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: req.body.userId}})
      .then(() => res.status(200).json({message: "Je like cette sauce"}))
      .catch(error => res.status(400).json({error}))
  }

  Sauce.findOne({_id: req.params.id})
      .then(sauce => {
        // Method to withdraw like when sauce is liked
        if(sauce.usersLiked.includes(req.body.userId)) {
          return Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}})
            .then(() => res.status(200).json({message: "Je retire mon like"}))
            .catch(error => res.status(400).json({error}))
        }
      })
      .catch(error => res.status(400).json({error}))
  next();
};
