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

router.get("/Default/123456/Uczen/UczenOnChange", (req, res) => {
    res.cookie("idBiezacyUczen", req.query.id);

    res.redirect(req.header("Referer"));
});

router.get("/Default/123456/Dziennik/DziennikOnChange", (req, res) => {
    res.cookie("idBiezacyDziennik", req.query.id);

    res.redirect(req.header("Referer"));
});

router.get("/Default/123456/Uczen.mvc/DanePodstawowe", (req, res) => {
    res.render("opiekun/dane", {
        title: "Witryna ucznia i rodzica – Dane ucznia",
        data: require("../../data/opiekun/dane.json")
    });
});

router.get("/Default/123456/Oceny(\.mvc|)/Wszystkie", (req, res) => {
    let dataPath;
    let viewPath;

    if (req.query.details === '2') {
        dataPath = "../../data/opiekun/oceny-szczegolowy.json";
        viewPath = "opiekun/oceny-szczegolowy";
    } else {
        viewPath = "opiekun/oceny-skrocony";
        dataPath = "../../data/opiekun/oceny-skrocony.json";
    }

    res.render(viewPath, {
        title: "Witryna ucznia i rodzica – Oceny",
        data: require(dataPath)
    });
});

router.get('/Default/123456/Frekwencja.mvc', (req, res) => {
    res.render("opiekun/frekwencja", {
        title: "Witryna ucznia i rodzica – Frekwencja",
        data: require("../../data/opiekun/frekwencja.json"),
        weekDays: converter.getWeekDaysFrom(req.query.data),
        tics: {
            prev: converter.getPrevTick(req.query.data),
            next: converter.getNextTick(req.query.data)
        }
    })
});

router.get("/Default/123456/Lekcja(\.mvc|)/PlanZajec", (req, res) => {
    res.render("opiekun/plan-zajec", {
        title: "Witryna ucznia i rodzica – Plan lekcji",
        data: require("../../data/opiekun/plan-zajec.json"),
        weekDays: converter.getWeekDaysFrom(req.query.data),
        tics: {
            prev: converter.getPrevTick(req.query.data),
            next: converter.getNextTick(req.query.data)
        }
    })
});

router.get("/Default/123456/Sprawdziany.mvc/Terminarz", (req, res) => {
    res.render("opiekun/sprawdziany", {
        title: "Witryna ucznia i rodzica – Terminarz sprawdzianów",
        data: require("../../data/opiekun/sprawdziany.json"),
        weekDays: converter.getWeekDaysFrom(req.query.data),
        tics: {
            prev: converter.getPrevTick(req.query.data),
            next: converter.getNextTick(req.query.data)
        }
    })
});

module.exports = router;
