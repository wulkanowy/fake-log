var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
  res.json({
    "name" : "uonetplus-opiekun",
    "message": "Not implemented yet"
  });
});

router.get("/Default/123456/", function (req, res) {
  res.redirect("/Default/123456/Start/Index/");
});

router.get("/Default/123456/Start/Index/", function (req, res) {
  res.render("opiekun-homepage", { title: "Witryna ucznia i rodzica – Strona główna" });
});

router.get("/Default/123456/Uczen.mvc/DanePodstawowe", function (req, res) {
  res.render("opiekun-dane", { title: "Witryna ucznia i rodzica – Dane ucznia" });
});

module.exports = router;
