const img2gcode = require("img2gcode");
const path = require("path");
const fs = require("fs");
var PNG = require("pngjs").PNG;
const { png2svg } = require("svg-png-converter");
const sharp = require("sharp");
const converter = function (req, res, next) {
  return new Promise(async (resolve, reject) => {
    const exists = fs.existsSync(
      path.join(__dirname, "../public/images/uploads")
    );

    if (!exists) {
      fs.mkdirSync(destFolder);
    }
    const destFolder = path.join(
      __dirname,
      "../public/images/uploads/sample1.png"
    );

    sharp(fs.readFileSync(req.file.path))
      .resize(250, 128)
      .toFile(destFolder, (err, info) => {
        console.log(err, info);

        fs.unlinkSync(req.file.path);
        if (err) return reject(err);
        return resolve(info);
      });
  });
};

module.exports = converter;
