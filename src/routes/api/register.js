const router = require('express').Router({});
const protocol = require('../../utils/connection');
const api = require("../../utils/api");

router.all("/Certyfikat", (req, res) => {
    let base = protocol(req) + "://" + req.get('host');

    res.json({
            "IsError": false,
            "IsMessageForUser": false,
            "Message": null,
            "TokenKey": null,
            "TokenStatus": "CertGenerated",
            "TokenCert": {
                "CertyfikatKlucz": "7EBA57E1DDBA1C249D097A9FF1C9CCDD45351A6A",
                "CertyfikatKluczSformatowanyTekst": "7E-BA-57-E1-DD-BA-1C-24-9D-09-7A-9F-F1-C9-CC-DD-45-35-1A-6A",
                "CertyfikatDataUtworzenia": Math.round(new Date().getTime() / 1000),
                "CertyfikatDataUtworzeniaSformatowanyTekst": new Date().toUTCString(),
                "CertyfikatPfx": "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",
                "GrupaKlientow": "Default",
                "AdresBazowyRestApi": base + "/Default/",
                "UzytkownikLogin": "admin",
                "UzytkownikNazwa": "admin",
                "TypKonta": null
            }
        }
    );
});

router.all("/ListaUczniow", (req, res) => {
    res.json(api.createResponse(require("../../../data/api/ListaUczniow")));
});

module.exports = router;
