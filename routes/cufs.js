var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
  res.redirect("/Default/Account/LogOn");
});

// GET login page
router.get("/Default/Account/LogOn", function(req, res) {
  res.render("login-form", { title: "login (Default)" });
});

// POST login
router.post("/Default/Account/LogOn", function(req, res) {
  res.json({"message": "Not implemented yet"});
});

module.exports = router;
