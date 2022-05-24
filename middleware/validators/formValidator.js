module.exports = async (req, res, next) => {
  try {
// Regex to test fields for valid characters
    const fieldsRegex = /^[a-zA-Z0-9 _.,!()&]+$/;
// Creating const from req.body
    const {name, manufacturer, description, mainPepper} = await req.body;

      if(fieldsRegex.test(name) &&
      fieldsRegex.test(manufacturer) &&
      fieldsRegex.test(description) &&
      fieldsRegex.test(mainPepper)) {
        next();
      } else {
          res.status(500).json({message: "Certains champs contiennent des caractères invalides"})
        }
  } catch(err) {
    res.status(500).json({message: "Certains champs contiennent des caractères invalides"})
  }
}
