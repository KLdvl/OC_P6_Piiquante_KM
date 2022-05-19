// Model used
const Sauce = require("../../models/Sauce");

// External requires
const fs = require("fs");

// Regex to test fields
const fieldsRegex = /^[a-zA-Z0-9 _.,!()&]+$/;

// Method for modifying an existing sauce
exports.updateSauce = (req, res, next) => {

  // If req file exists, delete old image
  if(req.file) {
    Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            throw err;
          }
        })
      })
      .catch(error => res.status(400).json({error}))
  }

// Populate new object with new image or new datas
  const sauceObject = req.file
    ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    }
    : {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      heat: req.body.heat,
      userId: req.body.userId,
    };

  // Regex test to check if fields do not contain unwanted symbols
  if (
    !fieldsRegex.test(sauceObject.name) ||
    !fieldsRegex.test(sauceObject.manufacturer) ||
    !fieldsRegex.test(sauceObject.description) ||
    !fieldsRegex.test(sauceObject.mainPepper) ||
    !fieldsRegex.test(sauceObject.heat)
  ) {
    return res
      .status(500)
      .json({ error: "Certains champs contiennent des caractères invalides" });
  }

  // Updating the sauce with new datas
  Sauce.updateOne(
    { _id: req.params.id },
    {
      ...sauceObject,
      _id: req.params.id,
    }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiéé !" }))
    .catch((error) => res.status(400).json({error }));
};
