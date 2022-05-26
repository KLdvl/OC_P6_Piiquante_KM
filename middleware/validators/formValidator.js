module.exports = async (req, res, next) => {
  try {
// Regex to test fields for valid characters
    const fieldsRegex = /^[a-zA-Z0-9 _.,!()&]+$/;
// Creating const from req.body
    const {name, manufacturer, description, mainPepper } = await JSON.parse(req.body.sauce);
    const filename = req.file.filename;
    console.log(filename)

      if(fieldsRegex.test(name) &&
      fieldsRegex.test(manufacturer) &&
      fieldsRegex.test(description) &&
      fieldsRegex.test(mainPepper)) {
        next();
      } else {
        return fs.unlink(`images/${filename}`, (err) => {
          if(err) throw err;
        })
        }
  } catch(err) {
    res.status(500).json({message: "Certains champs contiennent des caractères invalides"})
  }
}
