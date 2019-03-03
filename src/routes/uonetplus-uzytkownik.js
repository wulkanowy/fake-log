const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');
const md5 = require('md5');

router.get("/", (req, res) => {
    const base = protocol(req) + "://" + req.get('host') + "/Default";
    res.json({
        status: "sucess",
        data: {
            endpoints: [
                "/Wiadomosc.mvc/GetWiadomosciOdebrane",
                "/Wiadomosc.mvc/GetWiadomosciWyslane",
                "/Wiadomosc.mvc/GetWiadomosciUsuniete",
                "/NowaWiadomosc.mvc/GetJednostkiUzytkownika",
                "/Adresaci.mvc/GetAdresaci",
                "/Wiadomosc.mvc/GetAdresaciWiadomosci",
                "/Wiadomosc.mvc/GetTrescWiadomosci",
                "/NowaWiadomosc.mvc/InsertWiadomosc"
            ].map(item => {
                return base + item;
            })
        }
    });
});

router.get("/Wiadomosc.mvc/GetWiadomosciOdebrane", (req, res) => {
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

router.get("/Wiadomosc.mvc/GetWiadomosciWyslane", (req, res) => {
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

router.get("/Wiadomosc.mvc/GetWiadomosciUsuniete", (req, res) => {
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

router.get("/NowaWiadomosc.mvc/GetJednostkiUzytkownika", (req, res) => {
    const user = require("../../data/api/ListaUczniow")[1];
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

router.get("/Adresaci.mvc/GetAdresaci", (req, res) => {
    const user = require("../../data/api/ListaUczniow")[1];
    res.json({
        "success": true,
        "data": require("../../data/api/dictionaries/Pracownicy").map(item => {
            return {
                "Id": `${item.Id}rPracownik`,
                "Nazwa": `${item.Imie} ${item.Nazwisko} [${item.Kod}] - pracownik (${user.JednostkaSprawozdawczaSkrot})`,
                "IdLogin": item.Id,
                "IdJednostkaSprawozdawcza": user.IdJednostkaSprawozdawcza,
                "Rola": 2,
                "PushWiadomosc": null,
                "Hash": Buffer.from(md5(item.Id)).toString('base64')
            };
        })
    });
});

router.get("/Wiadomosc.mvc/GetAdresaciWiadomosci", (req, res) => {
    const user = require("../../data/api/ListaUczniow")[1];
    res.json({
        "success": true,
        "data": require("../../data/api/dictionaries/Pracownicy").slice(0, 2).map(item => {
            return {
                "Id": `${item.Id}rPracownik`,
                "Nazwa": `${item.Imie} ${item.Nazwisko} [${item.Kod}] - pracownik (${user.JednostkaSprawozdawczaSkrot})`,
                "IdLogin": item.Id,
                "IdJednostkaSprawozdawcza": null,
                "Rola": 2,
                "PushWiadomosc": null,
                "Hash": Buffer.from(md5(item.Id)).toString('base64')
            };
        })
    });
});

router.all("/Wiadomosc.mvc/GetTrescWiadomosci", (req, res) => {
    const message = require("../../data/api/messages/WiadomosciOdebrane")[0];
    res.json({
        "success": true,
        "data": {
            "Id": message.WiadomoscId,
            "Tresc": message.Tresc
        }
    });
});

router.all("/NowaWiadomosc.mvc/InsertWiadomosc", (req, res) => {
    let data = req.body.incomming;
    res.json({
        "success": true,
        "data": {
            "Adresaci": data.Adresaci.map(item => {
                item.PushWiadomosc = false;
                return item;
            }),
            "Temat": data.Temat,
            "Tresc": data.Tresc,
            "Nadawca": {
                "Id": null,
                "Nazwa": "Kowalski Jan",
                "IdLogin": 0,
                "IdJednostkaSprawozdawcza": null,
                "Rola": 0,
                "PushWiadomosc": null,
                "Hash": "hash"
            },
            "WiadomoscPowitalna": false,
            "Id": data.Id
        }
    });
});

module.exports = router;
