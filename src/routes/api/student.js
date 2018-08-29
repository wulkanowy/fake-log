const router = require('express').Router({});
const api = require('../../utils/api');

router.all("/LogAppStart", (req, res) => {
    res.json(api.createResponse("Log"));
});

router.all("/Slowniki", (req, res) => {
    res.json(api.createResponse({
        "TimeKey": Math.round(new Date().getTime() / 1000),
        "Nauczyciele": require("../../../data/api/dictionaries/Nauczyciele"),
        "Pracownicy": require("../../../data/api/dictionaries/Pracownicy"),
        "Przedmioty": require("../../../data/api/dictionaries/Przedmioty"),
        "PoryLekcji": require("../../../data/api/dictionaries/PoryLekcji"),
        "KategorieOcen": require("../../../data/api/dictionaries/KategorieOcen"),
        "KategorieUwag": require("../../../data/api/dictionaries/KategorieUwag"),
        "KategorieFrekwencji": require("../../../data/api/dictionaries/KategorieFrekwencji"),
        "TypyFrekwencji": require("../../../data/api/dictionaries/TypyFrekwencji")
    }));
});

router.all("/PlanLekcjiZeZmianami", (req, res) => {
   res.json(api.createResponse(require("../../../data/api/student/PlanLekcjiZeZmianami")));
});

router.all("/Oceny", (req, res) => {
    res.json(api.createResponse(require("../../../data/api/student/Oceny")));
});

router.all("/OcenyPodsumowanie", (req, res) => {
    res.json(api.createResponse(require("../../../data/api/student/OcenyPodsumowanie")));
});

router.all("/Sprawdziany", (req, res) => {
    res.json(api.createResponse(require("../../../data/api/student/Sprawdziany")));
});

router.all("/UwagiUcznia", (req, res) => {
    res.json(api.createResponse(require("../../../data/api/student/UwagiUcznia")));
});

router.all("/Frekwencje", (req, res) => {
    res.json(api.createResponse({
        "DataPoczatkowa": 1524434400,
        "DataKoncowa": 1525039199,
        "DataPoczatkowaTekst": "2018-04-23",
        "DataKoncowaTekst": "2018-04-29",
        "Frekwencje": require("../../../data/api/student/Frekwencje")
    }));
});

router.all("/ZadaniaDomowe", (req, res) => {
    res.json(api.createResponse(require("../../../data/api/student/ZadaniaDomowe")));
});

router.all("/Nauczyciele", (req, res) => {
    res.json(api.createResponse(require("../../../data/api/student/Nauczyciele")));
});

module.exports = router;
