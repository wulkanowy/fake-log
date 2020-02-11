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
            base + "/powiatwulkanowy/mobile-api/Uczen.v3.UczenStart/Certyfikat",
            base + "/powiatwulkanowy/mobile-api/Uczen.v3.UczenStart/ListaUczniow",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/LogAppStart",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Slowniki",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/PlanLekcjiZeZmianami",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Oceny",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/OcenyPodsumowanie",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Sprawdziany",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/UwagiUcznia",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Frekwencje",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/ZadaniaDomowe",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Nauczyciele",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/WiadomosciOdebrane",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/WiadomosciWyslane",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/WiadomosciUsuniete",
            base + "/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/DodajWiadomosc"
        ]
    });
});

router.use("/powiatwulkanowy/mobile-api/Uczen.v3.UczenStart", require("./register"));
router.use("/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen", require("./student"));
router.use("/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen", require("./messages"));
router.use("/powiatwulkanowy/123456/mobile-api/Push.v1.Push", require("./push"));

router.all("/*", (req, res) => {
    res.json({
        "status": "warning",
        "message": "Not implemented yet"
    });
});

module.exports = router;
