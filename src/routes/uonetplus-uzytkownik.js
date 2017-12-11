const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    "name" : "uonetplus-uzytkownik",
    "message": "Not implemented yet"
  });
});

module.exports = router;
