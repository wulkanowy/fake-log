const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');
const converter = require('../utils/converter');
const {getRandomInt} = require("../utils/api");

router.get("/", (req, res) => {
    res.render("messages");
});

router.get("/-endpoints", (req, res) => {
    const base = protocol(req) + "://" + req.get('host') + "/powiatwulkanowy";
    res.json({
        status: "sucess",
        data: {
            endpoints: [
                "/api/Skrzynki",
                "/api/Pracownicy",
                "/api/Odebrane",
                "/api/OdebraneSkrzynka",
                "/api/Wyslane",
                "/api/WyslaneSkrzynka",
                "/api/Usuniete",
                "/api/UsunieteSkrzynka",
                "/api/WiadomoscSzczegoly",
                "/api/WiadomoscOdpowiedzPrzekaz",
                "/api/WiadomoscNowa",
                "/api/MoveTrash",
                "/api/Delete",
            ].map(item => {
                return base + item;
            })
        }
    });
});

router.get([
    "/api/Odebrane",
    "/api/OdebraneSkrzynka",
], (req, res) => {
    res.json({
        "success": true,
        "data": require("../../data/api/messages/WiadomosciOdebrane").map(item => {
            const recipientsNumber = getRandomInt(60, 100);
            const readBy = getRandomInt(20, 60);
            const unreadBy = recipientsNumber - readBy;
            return {
                "Id": item.WiadomoscId * 2,
                "Nieprzeczytana": !item.GodzinaPrzeczytania,
                "Nieprzeczytane": unreadBy,
                "Przeczytane": readBy,
                "Data": converter.formatDate(new Date(item.DataWyslaniaUnixEpoch * 1000), true) + ' 00:00:00',
                "Tresc": null,
                "Temat": item.Tytul,
                "Nadawca": {
                    "Id": "" + item.NadawcaId,
                    "Name": item.Nadawca,
                    "IdLogin": item.NadawcaId,
                    "Unreaded": false,
                    "Date": null,
                    "Role": 2,
                    "PushMessage": false,
                    "UnitId": 0,
                    "Hash": "abcdef="
                },
                "IdWiadomosci": item.WiadomoscId,
                "HasZalaczniki": true,
                "FolderWiadomosci": 1,
                "Adresaci": []
            };
        })
    });
});

router.get([
    "/api/Wyslane",
    "/api/WyslaneSkrzynka",
], (req, res) => {
    res.json({
        "success": true,
        "data": require("../../data/api/messages/WiadomosciWyslane").map(item => {
            return {
                "Id": item.WiadomoscId * 2,
                "Nieprzeczytana": !item.GodzinaPrzeczytania,
                "Nieprzeczytane": parseInt(item.Nieprzeczytane, 10),
                "Przeczytane": parseInt(item.Przeczytane, 10),
                "Data": converter.formatDate(new Date(item.DataWyslaniaUnixEpoch * 1000), true) + ' 00:00:00',
                "Tresc": null,
                "Temat": item.Tytul,
                "Nadawca": {
                    "Id": "" + item.NadawcaId,
                    "Name": item.Nadawca,
                    "IdLogin": item.NadawcaId,
                    "Unreaded": false,
                    "Date": null,
                    "Role": 2,
                    "PushMessage": false,
                    "UnitId": 0,
                    "Hash": "abcdef="
                },
                "IdWiadomosci": item.WiadomoscId,
                "HasZalaczniki": false,
                "FolderWiadomosci": 2,
                "Adresaci": []
            };
        })
    });
});

router.get([
    "/api/Usuniete",
    "/api/UsunieteSkrzynka",
], (req, res) => {
    res.json({
        "success": true,
        "data": require("../../data/api/messages/WiadomosciUsuniete").map(item => {
            return {
                "Id": item.WiadomoscId * 2,
                "Nieprzeczytana": !item.GodzinaPrzeczytania,
                "Nieprzeczytane": parseInt(item.Nieprzeczytane, 10),
                "Przeczytane": parseInt(item.Przeczytane, 10),
                "Data": converter.formatDate(new Date(item.DataWyslaniaUnixEpoch * 1000), true) + ' 00:00:00',
                "Tresc": null,
                "Temat": item.Tytul,
                "Nadawca": {
                    "Id": "" + item.NadawcaId,
                    "Name": item.Nadawca,
                    "IdLogin": item.NadawcaId,
                    "Unreaded": false,
                    "Date": null,
                    "Role": 2,
                    "PushMessage": false,
                    "UnitId": 0,
                    "Hash": "abcdef="
                },
                "IdWiadomosci": item.WiadomoscId,
                "HasZalaczniki": false,
                "FolderWiadomosci": 3,
                "Adresaci": []
            };
        })
    });
});

router.get("/api/Skrzynki", (req, res) => {
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

router.all("/api/WiadomoscSzczegoly", (req, res) => {
    const message = require("../../data/api/messages/WiadomosciOdebrane")[0];
    res.json({
        "success": true,
        "data": {
            "Id": message.WiadomoscId,
            "Tresc": message.Tresc,
            "Zalaczniki": [
                {
                    "Url": "https://1drv.ms/u/s!AmvjLDq5anT2psJ4nujoBUyclWOUhw",
                    "IdOneDrive": "0123456789ABCDEF!123",
                    "IdWiadomosc": message.WiadomoscId,
                    "NazwaPliku": "nazwa_pliku.pptx",
                    "Id": message.WiadomoscId * 3
                },
                {
                    "Url": "https://wulkanowy.github.io/",
                    "IdOneDrive": "0123456789ABCDEF!124",
                    "IdWiadomosc": message.WiadomoscId,
                    "NazwaPliku": "wulkanowy.txt",
                    "Id": message.WiadomoscId * 4
                },
                {
                    "Url": "https://github.com/wulkanowy/wulkanowy",
                    "IdOneDrive": "0123456789ABCDEF!125",
                    "IdWiadomosc": message.WiadomoscId,
                    "NazwaPliku": "wulkanowy(2).txt",
                    "Id": message.WiadomoscId * 5
                }
            ]
        }
    });
});

router.all("/api/WiadomoscOdpowiedzPrzekaz", (req, res) => {
    const message = require("../../data/api/messages/WiadomosciOdebrane")[0];
    res.json({
        "success": true,
        "data": {
            "Id": message.WiadomoscId,
            "Tresc": message.Tresc,
            "Zalaczniki": [
                {
                    "Url": "https://1drv.ms/u/s!AmvjLDq5anT2psJ4nujoBUyclWOUhw",
                    "IdOneDrive": "0123456789ABCDEF!123",
                    "IdWiadomosc": message.WiadomoscId,
                    "NazwaPliku": "nazwa_pliku.pptx",
                    "Id": message.WiadomoscId * 3
                },
                {
                    "Url": "https://wulkanowy.github.io/",
                    "IdOneDrive": "0123456789ABCDEF!124",
                    "IdWiadomosc": message.WiadomoscId,
                    "NazwaPliku": "wulkanowy.txt",
                    "Id": message.WiadomoscId * 4
                },
                {
                    "Url": "https://github.com/wulkanowy/wulkanowy",
                    "IdOneDrive": "0123456789ABCDEF!125",
                    "IdWiadomosc": message.WiadomoscId,
                    "NazwaPliku": "wulkanowy(2).txt",
                    "Id": message.WiadomoscId * 5
                }
            ]
        }
    });
});

router.all("/api/Pracownicy", (req, res) => {
    const user = require("../../data/api/ListaUczniow")[1];
    const recipient = require("../../data/api/dictionaries/Pracownicy")[1];
    res.json({
        "success": true,
        "data": [
            {
                "Id": recipient.Id * 8, // ¯\_(ツ)_/¯
                "Name": `${recipient.Imie} ${recipient.Nazwisko} [${recipient.Kod}] - pracownik (${user.JednostkaSprawozdawczaSkrot})`,
                "IdLogin": recipient.LoginId,
                "Role": 7,
                "Hash": "abcd==",
            }
        ]
    });
});

router.all([
    "/api/MoveTrash",
    "/api/Delete",
], (req, res) => {
    res.status(204).send();
});

router.all("/api/WiadomoscNowa", (req, res) => {
    res.status(204).send();
});

module.exports = router;
