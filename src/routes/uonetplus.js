const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("log-exception", {
        title: "Dziennik FakeUONET+",
        message: "Podany identyfikator klienta jest niepoprawny.",
    });
});

router.get("/Default(/)?", (req, res) => {
    if (req.header("Referer") || "true" === req.query.login) {
        return res.redirect("/Default/Start.mvc/Index");
    }

    res.render("login", {
        title: "Dziennik FakeUONET+"
    });
});

router.all("/Default/LoginEndpoint.aspx", (req, res) => {
    if (req.body.wa && req.body.wresult) {
        return res.redirect("/Default/?login=true");
    }

    res.redirect("//" + req.get('host').replace("uonetplus", "cufs") + "/Default/Account/LogOn");
});

router.post("(/*)?", (req, res) => {
    res.render("permission-error", {
        title: "Logowanie"
    });
});

router.get("/Default/Start.mvc/Index", (req, res) => {
    res.render("homepage", {
        title: "Uonet+",
        uonetplusOpiekun: "//" + req.get('host').replace("uonetplus", "uonetplus-opiekun"),
        uonetplusUczen: "//" + req.get('host').replace("uonetplus", "uonetplus-uczen")
    });
});

module.exports = router;
