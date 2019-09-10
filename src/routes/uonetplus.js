const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');

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

    res.redirect(protocol(req) + "://" + req.get('host').replace("uonetplus", "cufs") + "/Default/Account/LogOn");
});

router.post("(/*)?", (req, res) => {
    res.render("permission-error", {
        title: "Logowanie"
    });
});

router.get("/Default/Start.mvc/Index", (req, res) => {
    res.render("homepage", {
        title: "Uonet+",
        uonetplusOpiekun: protocol(req) + "://" + req.get('host').replace("uonetplus", "uonetplus-opiekun"),
        uonetplusUczen: protocol(req) + "://" + req.get('host').replace("uonetplus", "uonetplus-uczen")
    });
});

router.get("/Default/Start.mvc/Endpoints", (req, res) => {
    const base = protocol(req) + "://" + req.get('host') + "/Default/Start.mvc";
    res.json({
        status: "sucess",
        data: {
            endpoints: [
                "/GetSelfGovernments",
                "/GetStudentTrips",
                "/GetLastNotes",
                "/GetFreeDays",
                "/GetKidsLuckyNumbers",
                "/GetKidsLessonPlan",
                "/GetLastHomeworks",
                "/GetLastTests",
                "/GetLastStudentLessons",
            ].map(item => {
                return base + item;
            })
        }
    });
});

router.get("/Default/Start.mvc/GetSelfGovernments", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.get("/Default/Start.mvc/GetStudentTrips", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.get("/Default/Start.mvc/GetLastNotes", (req, res) => {
    res.json(require("../../data/uonetplus/GetLastNotes"));
});

router.get("/Default/Start.mvc/GetFreeDays", (req, res) => {
    res.json(require("../../data/uonetplus/GetFreeDays"));
});

router.get("/Default/Start.mvc/GetKidsLuckyNumbers", (req, res) => {
    res.json(require("../../data/uonetplus/GetKidsLuckyNumbers"));
});

router.get("/Default/Start.mvc/GetKidsLessonPlan", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.get("/Default/Start.mvc/GetLastHomeworks", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.get("/Default/Start.mvc/GetLastTests", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.get("/Default/Start.mvc/GetLastStudentLessons", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

module.exports = router;
