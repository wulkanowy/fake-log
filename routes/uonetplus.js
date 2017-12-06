var express = require('express');
var router = express.Router();
var protocol = require('../utils/connection');

router.get("/", function(req, res) {
  res.json({
    "name" : "uonetplus",
    "message": "Not implemented yet"
  });
});

router.post("/Default/LoginEndpoint.aspx", function (req, res) {
  if (req.body.wa && req.body.wresult) {
    return res.redirect("/Default/")
  }

  res.json({message: "error"});
});

router.get("/Default/", function (req, res) {
  res.redirect("/Default/Start.mvc/Index");
});

router.get("/Default/Start.mvc/Index", function (req, res) {
  res.render("homepage", {
    title: "Uonet+",
    uonetplusOpiekun: protocol(req) + "://" + req.get('host').replace("uonetplus", "uonetplus-opiekun")
  });
});

module.exports = router;
