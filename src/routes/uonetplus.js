const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');

router.get("/powiatwulkanowy/Start.mvc/Endpoints", (req, res) => {
    const base = protocol(req) + "://" + req.get('host') + "/powiatwulkanowy/Start.mvc";
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
                "/GetStudentDirectorInformations",
            ].map(item => {
                return base + item;
            })
        }
    });
});

router.all("/powiatwulkanowy/Start.mvc/GetSelfGovernments", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.all("/powiatwulkanowy/Start.mvc/GetStudentTrips", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.all("/powiatwulkanowy/Start.mvc/GetLastNotes", (req, res) => {
    res.json(require("../../data/uonetplus/GetLastNotes"));
});

router.all("/powiatwulkanowy/Start.mvc/GetFreeDays", (req, res) => {
    res.json(require("../../data/uonetplus/GetFreeDays"));
});

router.all("/powiatwulkanowy/Start.mvc/GetKidsLuckyNumbers", (req, res) => {
    res.json(require("../../data/uonetplus/GetKidsLuckyNumbers"));
});

router.all("/powiatwulkanowy/Start.mvc/GetKidsLessonPlan", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.all("/powiatwulkanowy/Start.mvc/GetLastHomeworks", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.all("/powiatwulkanowy/Start.mvc/GetLastTests", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.all("/powiatwulkanowy/Start.mvc/GetLastStudentLessons", (req, res) => {
    res.json({
        "data": [],
        "success": false,
        "errorMessage": "Not implemented yet",
        "feedback": null
    });
});

router.all("/powiatwulkanowy/Start.mvc/GetStudentDirectorInformations", (req, res) => {
    res.json({
        "data": [
            {
                "Dane": null,
                "IkonkaNazwa": null,
                "Nazwa": "",
                "Nieaktywny": false,
                "Num": null,
                "Symbol": null,
                "Url": null,
                "Zawartosc": [
                    {
                        "Dane": "Dzień wolny od zajęć dydaktycznych<br />03.05.2021 – poniedziałek",
                        "IkonkaNazwa": null,
                        "Nazwa": "03.05.2021 Dzień wolny od zajęć dydaktycznych",
                        "Nieaktywny": false,
                        "Num": null,
                        "Symbol": null,
                        "Url": null,
                        "Zawartosc": []
                    }
                ]
            }
        ],
        "errorMessage": null,
        "feedback": null,
        "success": true
    });
});

router.get("/", (req, res) => {
    res.render("log-exception", {
        title: "Dziennik FakeUONET+",
        message: "Podany identyfikator klienta jest niepoprawny.",
    });
});

router.all(/^\/([a-z0-9]+)(?:\/LoginEndpoint\.aspx|\/)?$/i, (req, res) => {
    let hasCert = req.body.wa && req.body.wresult;

    if (req.params[0] != "powiatwulkanowy") {
        if (hasCert)
            res.render("permission-error", {
                title: "Logowanie",
            });
        else
            res.render("log-exception", {
                title: "Dziennik FakeUONET+",
                message: "Podany identyfikator klienta jest niepoprawny.",
            });

        return;
    } else if (hasCert) {
        return res.redirect("/powiatwulkanowy/Start.mvc/Index");
    }

    res.redirect(protocol(req) + "://" + req.get('host').replace("uonetplus", "cufs") + "/powiatwulkanowy/Account/LogOn");
});

router.get("/powiatwulkanowy/Start.mvc/Index", (req, res) => {
    res.render("homepage", {
        title: "Uonet+",
        uonetplusOpiekun: protocol(req) + "://" + req.get('host').replace("uonetplus", "uonetplus-opiekun"),
        uonetplusUczen: protocol(req) + "://" + req.get('host').replace("uonetplus", "uonetplus-uczen")
    });
});

module.exports = router;
