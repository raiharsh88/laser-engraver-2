const img2gcode = require("img2gcode");
const path = require("path");
const fs = require("fs");
var PNG = require("pngjs").PNG;
const { png2svg } = require("svg-png-converter");

const converter = function (req, res, next) {
  return new Promise(async (resolve, reject) => {
    let data = fs.readFileSync(req.file.path);
    var png = PNG.sync.read(data);
    var options = {
      colorType: 2,
      bgColor: {
        red: 255,
        green: 255,
        blue: 255,
      },
    };
    var buffer = PNG.sync.write(png, options);

    fs.writeFileSync(req.file.path, buffer);

    const result = await png2svg({
      tracer: "imagetracer",
      optimize: false,
      width: 220,
      height: 113,
      input: fs.readFileSync(req.file.path),
      numberofcolors: 5,
      pathomit: 1,
    });

    // console.log(result.content);

    // const newSVG = result.content.replace(
    //   /width="720" height="371"/,
    //   'width="220" height="113"'
    // );

    fs.writeFileSync(req.file.path.replace(".png", ".svg"), result.content);
    resolve("coverted successsfully");

    // img2gcode
    //   .start({
    //     // It is mm
    //     toolDiameter: 1,
    //     sensitivity: 0.95,
    //     scaleAxes: 128,
    //     feedrate: { work: 1000, idle: 1000 },
    //     deepStep: -1,
    //     laser: {
    //       commandPowerOn: "M04",
    //       commandPowerOff: "M05",
    //     },
    //     whiteZ: 0,
    //     blackZ: -3,
    //     safeZ: 1,
    //     info: "console",
    //     dirImg: req.file.path, //path.join(__dirname, "../public/images/hello.png"),
    //   })
    //   .on("log", (str) => {
    //     console.log(str);
    //   })
    //   .on("tick", (perc) => {
    //     bar.update(perc);
    //   })
    //   .then((data) => {
    //     console.log("Data", data.config);
    //     console.log(data.dirgcode);

    //     resolve("coverter successsfully");
    //   })

    //   .catch((err) => {
    //     console.log("lafda hua", err);
    //   });
    // reject("Failed to convert");
  });
};

async function xyz() {}

xyz();

module.exports = converter;
