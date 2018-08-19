var express = require("express");
var router = express.Router();
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();

router.get("/", function(req, res, next) {
  client
    .documentTextDetection("./resources/flipkart.png")
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

module.exports = router;
