var express = require('express');
var router = express.Router();

global.opiekunRoot = "/Default/123456";

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
  res.render("opiekun/start", { title: "Witryna ucznia i rodzica – Strona główna" });
});

router.get("/Default/123456/Uczen.mvc/DanePodstawowe", function (req, res) {
  res.render("opiekun/dane", {
    title: "Witryna ucznia i rodzica – Dane ucznia",
    data: require("../data/opiekun/dane.json")
  });
});

router.get("/Default/123456/Oceny(\.mvc|)/Wszystkie", function (req, res) {
  if (req.query.details === '2') {
    res.render("opiekun/oceny-szczegolowy", {
      data: require("../data/opiekun/oceny-szczegolowy.json")
    });
  } else {
    res.render("opiekun/oceny-skrocony", {
      data: require("../data/opiekun/oceny-skrocony.json")
    });
  }
});

module.exports = router;
