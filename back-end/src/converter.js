const img2gcode = require("img2gcode");

const converter = function (req, res, next) {
  return new Promise((resolve, reject) => {
    img2gcode
      .start({
        // It is mm
        toolDiameter: 1,
        sensitivity: 0.95,
        scaleAxes: 50,
        feedrate: { work: 1000, idle: 1000 },
        deepStep: -1,
        laser: {
          commandPowerOn: "M04",
          commandPowerOff: "M05",
        },
        whiteZ: 3,
        blackZ: -3,
        safeZ: 1,
        info: "console",
        dirImg: req.file.path,
      })
      .on("log", (str) => {
        console.log(str);
      })
      .on("tick", (perc) => {
        bar.update(perc);
      })
      .then((data) => {
        console.log("Data", data.config);
        console.log(data.dirgcode);

        resolve("coverter successsfully");
      })

      .catch((err) => {
        console.log("lafda hua", err);
      });
    reject("Failed to convert");
  });
};

module.exports = converter;
