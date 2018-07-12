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
