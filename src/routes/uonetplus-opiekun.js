const express = require('express');
const router = express.Router();

global.opiekunRoot = "/Default/123456";

router.get("/", (req, res) => {
  res.json({
    "name" : "uonetplus-opiekun",
    "message": "Not implemented yet"
  });
});

router.get("/Default/123456/", (req, res) => {
  res.redirect("/Default/123456/Start/Index/");
});

router.get("/Default/123456/Start/Index/", (req, res) => {
  res.render("opiekun/start", { title: "Witryna ucznia i rodzica – Strona główna" });
});

router.get("/Default/123456/Uczen.mvc/DanePodstawowe", (req, res) => {
  res.render("opiekun/dane", {
    title: "Witryna ucznia i rodzica – Dane ucznia",
    data: require("../../data/opiekun/dane.json")
  });
});

router.get("/Default/123456/Oceny(\.mvc|)/Wszystkie", (req, res) => {
  if (req.query.details === '2') {
    res.render("opiekun/oceny-szczegolowy", {
      data: require("../../data/opiekun/oceny-szczegolowy.json")
    });
  } else {
    res.render("opiekun/oceny-skrocony", {
      data: require("../../data/opiekun/oceny-skrocony.json")
    });
  }
});

module.exports = router;
