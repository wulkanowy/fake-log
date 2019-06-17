const router = require('express').Router();
const protocol = require('../../utils/connection');

router.all("/", (req, res) => {
    let base = protocol(req) + "://" + req.get('host');
    res.json({
        "status": "success",
        "start": base.replace("api.", ""),
        "repo": "https://github.com/wulkanowy/fake-log",
        "sdk": "https://github.com/wulkanowy/sdk",
        "docs": "https://gitlab.com/erupcja/uonet-api-docs",
        "endpoints": [
            base + "/Default/mobile-api/Uczen.v3.UczenStart/Certyfikat",
            base + "/Default/mobile-api/Uczen.v3.UczenStart/ListaUczniow",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/LogAppStart",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/Slowniki",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/PlanLekcjiZeZmianami",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/Oceny",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/OcenyPodsumowanie",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/Sprawdziany",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/UwagiUcznia",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/Frekwencje",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/ZadaniaDomowe",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/Nauczyciele",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/WiadomosciOdebrane",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/WiadomosciWyslane",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/WiadomosciUsuniete",
            base + "/Default/123456/mobile-api/Uczen.v3.Uczen/DodajWiadomosc"
        ]
    });
});

router.use("/Default/mobile-api/Uczen.v3.UczenStart", require("./register"));
router.use("/Default/123456/mobile-api/Uczen.v3.Uczen", require("./student"));
router.use("/Default/123456/mobile-api/Uczen.v3.Uczen", require("./messages"));
router.use("/Default/123456/mobile-api/Push.v1.Push", require("./push"));

router.all("/*", (req, res) => {
    res.json({
        "status": "warning",
        "message": "Not implemented yet"
    });
});

module.exports = router;
