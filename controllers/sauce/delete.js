// Model used
const Sauce = require("../../models/Sauce");

// External requires
const fs = require("fs");

// Method for deleting a sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "Sauce non trouvée" });
      }
      if (sauce.userId !== req.auth.userId) {
        return res
          .status(401)
          .json({ message: "Requête non autorisée" });
      }
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {
        if(err) {
          next(err)
        } else {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce supprimée" }))
            .catch(error => res.status(400).json({ error }));
        }
      })
    })
    .catch(error => res.status(500).json({error}));
};
