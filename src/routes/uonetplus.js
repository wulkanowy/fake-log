const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');

router.get("/", (req, res) => {
  res.json({
    "name" : "uonetplus",
    "message": "Not implemented yet"
  });
});

router.post("/Default/LoginEndpoint.aspx", (req, res) => {
  if (req.body.wa && req.body.wresult) {
    return res.redirect("/Default/")
  }

  res.json({message: "error"});
});

router.get("/Default/", (req, res) => {
  res.redirect("/Default/Start.mvc/Index");
});

router.get("/Default/Start.mvc/Index", (req, res) => {
  res.render("homepage", {
    title: "Uonet+",
    uonetplusOpiekun: protocol(req) + "://" + req.get('host').replace("uonetplus", "uonetplus-opiekun")
  });
});

module.exports = router;
