var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
  res.json({
    "name" : "uonetplus-opiekun",
    "message": "Not implemented yet"
  });
});

router.get("/demo123/123456/Start/Index/", function (req, res) {
  res.render("opiekun-homepage", { title: "Witryna ucznia i rodzica – Strona główna" });
});

module.exports = router;
