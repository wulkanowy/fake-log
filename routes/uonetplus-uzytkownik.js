var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
  res.json({
    "name" : "uonetplus-uzytkownik",
    "message": "Not implemented yet"
  });
});

module.exports = router;
