var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
  res.json({
    "name" : "uonetplus",
    "message": "Not implemented yet"
  });
});

router.post("/demo123/LoginEndpoint.aspx", function (req, res) {
  if (req.body.wa && req.body.wresult) {
    return res.redirect("/demo123/")
  }

  res.json({message: "error"});
});

router.get("/demo123/", function (req, res) {
  res.redirect("/demo123/Start.mvc/Index");
});

router.get("/demo123/Start.mvc/Index", function (req, res) {
  res.render("homepage", {
    title: "Uonet+",
    uonetplusOpiekun: "http://uonetplus-opiekun.fakelog.localhost:3000"
  });
});

module.exports = router;
