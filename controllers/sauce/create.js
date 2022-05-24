// Model used
const Sauce = require("../../models/Sauce");

// Method for creating a new sauce
exports.createSauce = async (req, res) => {
  try {
    const sauceObject = await req.body;
    console.log(sauceObject)
    delete sauceObject._id;

    await Sauce.create({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    res.status(201).json({message: "Sauce créée !"})
  } catch(err) {
    res.status(400).json({error : err})
  }
}
