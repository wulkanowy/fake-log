const express = require('express');
const fs = require('fs');
const router = express.Router();
const protocol = require('../utils/connection');

router.get("/", (req, res) => {
    res.redirect("/Default/Account/LogOn");
});

// GET login page
router.get("/Default/Account/LogOn", (req, res) => {
    res.render("login-form", {title: "Logowanie (Default)"});
});

// POST login
router.post("/Default/Account/LogOn", (req, res) => {
    if ('admin' === req.body.LoginName && 'admin' === req.body.Password) {
        res.cookie("Vulcan.CUFS.WebFrontEndCookie", "1234567891012131314151617181920212223242526+");
        res.cookie("ARR_cufs.vulcan.net.pl", "1234567891012131314151617181920212223242526272829303132333435363");
        return res.redirect("/Default/FS/LS?" +
            "wa=wsignin1.0&" +
            "wtrealm=" + protocol(req) + "%3a%2f%2fuonetplus.fakelog.localhost%3A300%2fdemo123%2fLoginEndpoint.aspx&" +
            "wctx=" + protocol(req) + "%3a%2f%2fuonetplus.fakelog.localhost%3A300%2fdemo123%2fLoginEndpoint.aspx")
    }

    res.render("login-form", {title: "Logowanie (Default)", message: "Zła nazwa użytkownika lub hasło"});
});

router.get("/Default/FS/LS", (req, res) => {
    res.render("login-cert", {
        cert: fs.readFileSync("public/cert.xml", "utf8"),
        uonetplusOpiekun: protocol(req) + "://" + req.get('host').replace("cufs.", "uonetplus.")
    });
});

module.exports = router;
