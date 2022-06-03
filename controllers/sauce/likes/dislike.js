const Sauce = require("../../../models/Sauce");

exports.dislikeSauce = async (req, res) => {
  try {
    // Destructuring
    const {like, userId} = req.body;
    // Creating a dislike
      if(like === -1) {
      await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: userId}})
      res.status(200).json({message: "Je dislike cette sauce"})
    }
      // Withdrawing a dislike
      if(like === 0) {
        const sauce = await Sauce.findById({_id: req.params.id})
        const {usersDisliked} = sauce;
        if (usersDisliked.includes(userId)) {
          await Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: userId}})
          res.status(200).json({message: "Je retire mon dislike"})
        }
      }
  } catch(err) {
    res.status(400).json({error : err})
  }
}
