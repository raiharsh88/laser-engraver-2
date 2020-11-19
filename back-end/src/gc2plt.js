const fs = require("fs");
const path = require("path");

const transpiler = function (fileName) {
  const location = path.join(__dirname, "../public/images/plus.gcode");
  const exists = fs.existsSync(location);

  if (!exists) {
    return console.log("File does not exists");
  }
  var gc = fs.readFileSync(location).toString();

  gc = gc.split("\n");

  gc = gc.filter((g) => g.indexOf(";") === -1);
  gc.unshift("IN;");

  var lx = "";
  var ly = "";
  var plt = gc
    .map((g) => {
      let str = "";

      if (g.indexOf("M04") !== -1) {
        str += "PD";
      } else if (g.indexOf("M05") !== -1) {
        str += "PU";
      } else {
        str += "PU";
      }
      //console.log(g);
      if (g.indexOf("X") !== -1 && g.indexOf("Y") !== -1) {
        g = g.slice(g.indexOf("X"));
        g = g.split(" ");
        str = `${str}${g[0].slice(1)},${g[1].slice(1)}`.trim();
        lx = g[0].slice(1);
        ly = g[1].slice(1);
      } else if (g.indexOf("X") !== -1 && g.indexOf("Y") === -1) {
        g = g.slice(g.indexOf("X"));
        g = g.split(" ");
        str = `${str}${g[0].slice(1)},${
          ly.length > 0 ? ly : g[0].slice(1)
        }`.trim();
        lx = g[0].slice(1);
      } else if (g.indexOf("X") === -1 && g.indexOf("Y") !== -1) {
        g = g.slice(g.indexOf("Y"));
        g = g.split(" ");
        str = `${str}${lx.length > 0 ? lx : g[0].slice(1)},${g[0].slice(
          1
        )}`.trim();
        ly = g[0].slice(1);
      } else {
        return "blank";
      }
      return str;
    })
    .filter((e) => e !== "blank");
  plt.unshift("IN");
  plt.push("PU;");

  console.log(
    plt.filter((e) => e.indexOf("PU") == -1 && e.indexOf("PD") == -1)
  );
  plt = plt.join(";").split("\n").join("");
  fs.writeFileSync(
    path.join(__dirname, "../public/images/cutom.plt"),
    plt,
    "utf-8"
  );
};

transpiler();

module.exports = transpiler;
