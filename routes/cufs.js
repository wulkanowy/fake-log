var express = require('express');
var fs = require('fs');
var router = express.Router();
var protocol = require('../utils/connection');

router.get("/", function(req, res) {
  res.redirect("/Default/Account/LogOn");
});

// GET login page
router.get("/Default/Account/LogOn", function(req, res) {
  res.render("login-form", { title: "Logowanie (Default)" });
});

// POST login
router.post("/Default/Account/LogOn", function(req, res) {
  if ('admin' === req.body.LoginName && 'admin' === req.body.Password) {
    return res.redirect("/Default/FS/LS?" +
      "wa=wsignin1.0&" +
      "wtrealm=" + protocol(req) + "%3a%2f%2fuonetplus.fakelog.localhost%3A300%2fdemo123%2fLoginEndpoint.aspx&" +
      "wctx=" + protocol(req) + "%3a%2f%2fuonetplus.fakelog.localhost%3A300%2fdemo123%2fLoginEndpoint.aspx")
  }

  res.render("login-form", { title: "Logowanie (Default)", message: "Zła nazwa użytkownika lub hasło" });
});

router.get("/Default/FS/LS", function (req, res) {
  res.render("login-cert", {
    cert: fs.readFileSync("public/cert.xml", "utf8"),
    uonetplusOpiekun: protocol(req) + "://" + req.get('host').replace("cufs.", "uonetplus.")
  });
});

module.exports = router;
