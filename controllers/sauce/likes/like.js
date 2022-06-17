const Sauce = require("../../../models/Sauce");

exports.likeSauce = async (req, res) => {
  try{
    // Destructuring
    const {like, userId} = req.body;
    // Find sauce that needs to be updated
    const sauce = await Sauce.findById({_id: req.params.id})
    // Using switch to handle all the cases
    switch(like) {
      // If like === 1
      case 1:
        if(!sauce.usersLiked.includes(userId)) {
          await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: userId}})
          res.status(200).json({message: "Je like cette sauce"})
        }
            break;
        // If like === 0
      case 0:
        if(sauce.usersLiked.includes(userId)) {
          await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: userId}})
        res.status(200).json({message: "Je retire mon like"})
        }
        if(sauce.usersDisliked.includes(userId)) {
          await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: userId}})
          res.status(200).json({message: "Je retire mon dislike"})
        }
            break;
        // If like === -1
      case -1:
        if(!sauce.usersDisliked.includes(userId)) {
          await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: userId}})
          res.status(200).json({message: "Je dislike cette sauce"})
        }
            break;
    }

  } catch(err) {
    res.status(400).json({error: err})
  }
}