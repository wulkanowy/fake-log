const router = require('express').Router({});
const {createEnvelope} = require("./utils");
const {format} = require("date-fns");

router.all("/lucky", (req, res) => {
    res.json(createEnvelope(0, "OK", "LuckyNumberPayload", {
        "Day": format(new Date(), "yyyy-MM-dd"),
        "Number": format(new Date(), "d")
    }));
});

module.exports = router;
