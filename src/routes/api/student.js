const router = require('express').Router({});
const uuid = require("uuid");
const {getTime, format} = require("date-fns");

router.all("/version", (req, res) => {
    res.json({
        "Envelope": null,
        "EnvelopeType": "Object",
        "InResponseTo": null,
        "RequestId": uuid(),
        "Status": {
            "Code": 105,
            "Message": "Podany czas jest nieprawidłowy"
        },
        "Timestamp": getTime(new Date()),
        "TimestampFormatted": format(new Date(), "yyyy-MM-dd HH:mm:ss")
    });
});

router.all("/internal/time", (req, res) => {
    res.json({
        "Envelope": {
            "Date": format(new Date(), "yyyy-MM-dd"),
            "DateDisplay": format(new Date(), "dd.MM.yyyy"),
            "Time": format(new Date(), "HH:mm:ss"),
            "Timestamp": getTime(new Date())
        },
        "EnvelopeType": "DateInfoPayload",
        "InResponseTo": null,
        "RequestId": uuid(),
        "Status": {
            "Code": 0,
            "Message": "OK"
        },
        "Timestamp": getTime(new Date()),
        "TimestampFormatted": format(new Date(), "yyyy-MM-dd HH:mm:ss")
    });
});

router.all("/heartbeat", (req, res) => {
    res.json({
        "Envelope": true,
        "EnvelopeType": "Boolean",
        "InResponseTo": null,
        "RequestId": uuid(),
        "Status": {
            "Code": 0,
            "Message": "OK"
        },
        "Timestamp": getTime(new Date()),
        "TimestampFormatted": format(new Date(), "yyyy-MM-dd HH:mm:ss")
    });
});

module.exports = router;
