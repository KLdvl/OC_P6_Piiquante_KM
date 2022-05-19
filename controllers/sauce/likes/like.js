const Sauce = require("../../../models/Sauce");

exports.likeSauce = async (req, res, next) => {
  try {
    // Destructuring
    const {like, userId} = req.body;
    // Creating a like
    if(like === 1) {
      await Sauce.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: userId}})
      res.status(200).json({message: "Je like cette sauce"})
    }
    // Withdrawing a like
    if(like === 0) {
      const sauce = await Sauce.findById({_id: req.params.id})
      const {usersLiked} = sauce;
      if (usersLiked.includes(userId)) {
        await Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: userId}})
        res.status(200).json({message: "Je retire mon like"})
      }
    }
  } catch(err) {
    res.status(400).json({error : err})
  }
  next()
}
