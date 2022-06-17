// Model used
const Sauce = require("../../models/Sauce");

// External requires
const fs = require("fs");

// Method for modifying an existing sauce
exports.updateSauce = async (req, res) => {
  try {
// destructuring req.body
    const {name, manufacturer, description, mainPepper, heat, userId} = req.body;

     // Check if file is updated and delete old one if existing
    if(req.file) {
      const sauce = await Sauce.findById({_id: req.params.id}).exec();
      const {imageUrl} = sauce
      const filename = imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {})
    }

    // Populate new object with new image or new datas
    const sauceObject = req.file
      ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
      : {
        name: name,
        manufacturer: manufacturer,
        description: description,
        mainPepper: mainPepper,
        heat: heat,
        userId: userId,
      };

// Update sauce data or image
    await Sauce.findByIdAndUpdate({_id: req.params.id}, {
      ...sauceObject,
      _id: req.params.id,
    })
    res.status(200).json({message: "Sauce modifiéé !"})

} catch(err) {
  res.status(400).json({error})
}
}
