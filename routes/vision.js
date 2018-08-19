var express = require("express");
var router = express.Router();
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();

router.post("/", function(req, res, next) {
  if (!req.files) {
    console.log("No file found!!");
    return res.json({ isSuccess: false, error: "No files were uploaded." });
  }

  let visionImage = req.files.visionImage;
  visionImage.mv("./resources/visionImage.png", function(err) {
    console.log("In file handler");
    if (err) {
      console.log("server error");
      return res.json({ isSuccess: false, error: "Server Error occured!" });
    }
    console.log("File saved");
    client
      .documentTextDetection("./resources/visionImage.png")
      .then(results => {
        res.json({
          isSuccess: true,
          data: results
        });
      })
      .catch(err => {
        res.json({
          isSuccess: false,
          error: err
        });
      });
  });
});

module.exports = router;