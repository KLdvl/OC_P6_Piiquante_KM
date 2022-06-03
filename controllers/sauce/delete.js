// Model used
const Sauce = require("../../models/Sauce");

// External requires
const fs = require("fs");

// Method for deleting a sauce
exports.deleteSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.findById({_id: req.params.id}).exec();
    const {userId, imageUrl} = sauce;
    if (!sauce) {
      return res.status(404).json({message: "Sauce non trouvée"})
    }
    if(userId !== req.auth.userId) {
      return res.status(401).json({message: "Requête non autorisée"})
    }
    const filename = imageUrl.split('/images/')[1];

     fs.unlink(`images/${filename}`, (err) => {});

    await Sauce.findByIdAndDelete({_id: req.params.id });
    res.status(200).json({message: "Sauce supprimée !"})

  } catch(err) {
      res.status(500).json({error: err})
    }
}
