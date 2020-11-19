const express = require("express");
var converter = require("./converter");
const path = require("path");
const multer = require("multer");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const path_to_static = path.join(__dirname, "../public");
const PORT = 3001;
const uploadsFolder = path.join(path_to_static, "/images/uploads");

app.use(express.static(path_to_static));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer configuration

const fileFilter = function (req, file, cb) {
  console.log(file);
  cb(null, true);
};

var storage = multer.diskStorage({
  destination: uploadsFolder,
  filename: function (req, file, cb) {
    console.log(file.fieldname + "-" + Date.now().toString() + ".png");
    cb(null, file.fieldname + "-" + Date.now().toString() + ".png");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000, fileFilter },
}).single("canvas");

app.get("/test", (req, res) => {
  res.sendFile("test.html", { root: path_to_static });
});

app.post("/image-upload", (req, res, next) => {
  const exists = fs.existsSync(uploadsFolder);
  if (!exists) {
    fs.mkdirSync(uploadsFolder);
  }

  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ msg: "BAD_REQUEST" });
    }

    await converter(req, res, next)
      .then((msg) => {
        res.json({ msg: "data received" });
      })
      .catch((err) => {
        res.status(500).json({ msg: "SERVER_INTERNAL_ERROR" });
      });
    //
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
