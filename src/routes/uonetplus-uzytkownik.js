const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        "name": "uonetplus-uzytkownik",
        "message": "Not implemented yet"
    });
});

router.get("/Default/Wiadomosc.mvc/GetWiadomosciOdebrane", (req, res) => {
    let i = 0;
    res.json({
        "success": true,
        "data": require("../../data/api/messages/WiadomosciOdebrane").map(item => {
            return {
                "Nieprzeczytana": !item.GodzinaPrzeczytania,
                "Data": new Date(item.DataWyslaniaUnixEpoch * 1000).toISOString(),
                "Tresc": null,
                "Temat": item.Tytul,
                "NadawcaNazwa": item.Nadawca,
                "IdWiadomosci": item.WiadomoscId,
                "IdNadawca": item.NadawcaId,
                "Id": ++i
            };
        })
    });
});

router.get("/Default/Wiadomosc.mvc/GetWiadomosciWyslane", (req, res) => {
    res.json({
        "success": true,
        "data": require("../../data/api/messages/WiadomosciWyslane").map(item => {
            return {
                "Data": new Date(item.DataWyslaniaUnixEpoch * 1000).toISOString(),
                "Temat": item.Tytul,
                "Adresaci": item.Adresaci[0].Nazwa,
                "Nieprzeczytane": item.Nieprzeczytane,
                "Przeczytane": item.Przeczytane,
                "Id": item.WiadomoscId
            };
        })
    });
});

router.get("/Default/Wiadomosc.mvc/GetWiadomosciUsuniete", (req, res) => {
    let i = 0;
    res.json({
        "success": true,
        "data": require("../../data/api/messages/WiadomosciUsuniete").map(item => {
            return {
                "FolderWiadomosci": "1",
                "Nieprzeczytana": !item.GodzinaPrzeczytania,
                "Data": new Date(item.DataWyslaniaUnixEpoch * 1000).toISOString(),
                "Tresc": null,
                "Temat": item.Tytul,
                "NadawcaNazwa": item.Nadawca,
                "IdWiadomosci": item.WiadomoscId,
                "IdNadawca": item.NadawcaId,
                "Id": ++i
            };
        })
    });
});

router.get("/Default/NowaWiadomosc.mvc/GetJednostkiUzytkownika", (req, res) => {
    const user = require("../../data/api/ListaUczniow")[0];
    res.json({
        "success": true,
        "data": [
            {
                "IdJednostkaSprawozdawcza": user.IdJednostkaSprawozdawcza,
                "Skrot": user.JednostkaSprawozdawczaSkrot,
                "Role": [1],
                "NazwaNadawcy": user.Imie + " " + user.Nazwisko,
                "WychowawcaWOddzialach": [],
                "Id": user.Id
            }
        ]
    });
});

router.get("/Default/Adresaci.mvc/GetAdresaci", (req, res) => {
    const user = require("../../data/api/ListaUczniow")[0];
    res.json({
        "success": true,
        "data": require("../../data/api/dictionaries/Pracownicy").map(item => {
            return {
                "Id": item.Id + "rPracownik",
                "Nazwa": item.Imie + " " + item.Nazwisko + " [" + item.Kod + "] - pracownik (" + user.JednostkaSprawozdawczaSkrot + ")",
                "IdLogin": item.Id,
                "IdJednostkaSprawozdawcza": user.IdJednostkaSprawozdawcza,
                "RolaEnum": null,
                "Rola": 2,
                "PushWiadomosc": null
            };
        })
    });
});

router.all("/Default/Wiadomosc.mvc/GetTrescWiadomosci", (req, res) => {
    const message = require("../../data/api/messages/WiadomosciOdebrane")[0];
    res.json({
        "success": true,
        "data": {
            "Id": message.WiadomoscId,
            "Tresc": message.Tresc
        }
    });
});

module.exports = router;
