const express = require('express');
const router = express.Router();
const converter = require('../utils/converter');

global.opiekunRoot = "/Default/123456";

router.get("/", (req, res) => {
    res.json({
        "name": "uonetplus-opiekun",
        "message": "Not implemented yet"
    });
});

router.get("/Default/123456/", (req, res) => {
    res.redirect("/Default/123456/Start/Index/");
});

router.get("/Default/123456/Start/Index/", (req, res) => {
    res.cookie("EfebSsoAuthCookie", "asdfasdfasdfasdfasdfasdfas", {
        domain: req.get('host').replace("uonetplus-opiekun", ""),
        path: '/',
        httpOnly: true
    });
    res.cookie("idBiezacyDziennik", "1234");
    res.render("opiekun/start", {title: "Witryna ucznia i rodzica – Strona główna"});
});

router.get("/Default/123456/Uczen.mvc/DanePodstawowe", (req, res) => {
    res.render("opiekun/dane", {
        title: "Witryna ucznia i rodzica – Dane ucznia",
        data: require("../../data/opiekun/dane.json")
    });
});

router.get("/Default/123456/Oceny(\.mvc|)/Wszystkie", (req, res) => {
    let dataPath;
    let viePath;

    if (req.query.details === '2') {
        dataPath = "../../data/opiekun/oceny-szczegolowy.json";
        viePath = "opiekun/oceny-szczegolowy";
    } else {
        viePath = "opiekun/oceny-skrocony";
        dataPath = "../../data/opiekun/oceny-skrocony.json";
    }

    res.render(viePath, {
        title: "Witryna ucznia i rodzica – Oceny",
        data: require(dataPath)
    });
});

router.get("/Default/123456/Lekcja(\.mvc|)/PlanLekcji", (req, res) => {
    res.render("opiekun/plan-lekcji", {
        title: "Witryna ucznia i rodzica – Paln Lekcji",
        data: require("../../data/opiekun/plan-lekcji.json"),
        weekDays: converter.getWeekDaysFrom(req.query.data),
        tics: {
            prev: converter.getPrevTick(req.query.data),
            next: converter.getNextTick(req.query.data)
        }
    })
});

module.exports = router;
