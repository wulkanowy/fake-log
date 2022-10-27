const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');
const {timestampToIsoTzFormat, dateToTimestamp} = require('../utils/converter');
const {fromString} = require('uuidv4');

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
    const currentTimestamp = dateToTimestamp(new Date());
    res.json(require("../../data/api/messages/WiadomosciOdebrane").map((item, i) => {
        let itemTimestamp = item.DataWyslaniaUnixEpoch;
        if (i < 7) {
            itemTimestamp = currentTimestamp - (i * i * 3600 * 6);
        }
        return {
            "apiGlobalKey": fromString(item.WiadomoscId.toString()),
            "korespondenci": item.Nadawca + " - P - (123456)",
            "temat": item.Tytul,
            "data": timestampToIsoTzFormat(itemTimestamp),
            "skrzynka": "Jan Kowalski - U - (123456)",
            "hasZalaczniki": true,
            "przeczytana": !!item.GodzinaPrzeczytania,
            "nieprzeczytanePrzeczytanePrzez": null,
            "wazna": false,
            "uzytkownikRola": 2,
            "id": item.WiadomoscId
        };
    }));
});

router.get([
    "/api/Wyslane",
    "/api/WyslaneSkrzynka",
], (req, res) => {
    res.json(require("../../data/api/messages/WiadomosciWyslane").map(item => {
        return {
            "apiGlobalKey": fromString(item.WiadomoscId.toString()),
            "korespondenci": item.Nadawca + " - P - (123456)",
            "temat": item.Tytul,
            "data": timestampToIsoTzFormat(item.DataWyslaniaUnixEpoch),
            "skrzynka": "Jan Kowalski - U - (123456)",
            "hasZalaczniki": true,
            "przeczytana": !!item.GodzinaPrzeczytania,
            "nieprzeczytanePrzeczytanePrzez": null,
            "wazna": false,
            "uzytkownikRola": 2,
            "id": item.WiadomoscId
        };
    }));
});

router.get([
    "/api/Usuniete",
    "/api/UsunieteSkrzynka",
], (req, res) => {
    res.json(require("../../data/api/messages/WiadomosciUsuniete").map(item => {
        return {
            "apiGlobalKey": fromString(item.WiadomoscId.toString()),
            "korespondenci": item.Nadawca + " - P - (123456)",
            "temat": item.Tytul,
            "data": timestampToIsoTzFormat(item.DataWyslaniaUnixEpoch),
            "skrzynka": "Jan Kowalski - U - (123456)",
            "hasZalaczniki": true,
            "przeczytana": !!item.GodzinaPrzeczytania,
            "nieprzeczytanePrzeczytanePrzez": null,
            "wazna": false,
            "uzytkownikRola": 2,
            "id": item.WiadomoscId
        };
    }));
});

router.get("/api/Skrzynki", (req, res) => {
    const users = require("../../data/api/ListaUczniow");
    res.json(users.map(user => {
        return {
            "globalKey": fromString(user.UzytkownikLoginId.toString()),
            "nazwa": `${user.Imie} ${user.Nazwisko} - U - (${user.JednostkaSprawozdawczaSkrot})`,
            "typUzytkownika": 3
        };
    }));
});

router.all("/api/WiadomoscSzczegoly", (req, res) => {
    const message = require("../../data/api/messages/WiadomosciOdebrane")[0];
    res.json({
        "data": timestampToIsoTzFormat(message.DataWyslaniaUnixEpoch),
        "apiGlobalKey": fromString(message.WiadomoscId.toString()),
        "nadawca": "Natalia Wrzesień - P - (123456)",
        "odbiorcy": ["Jan kowalski - U - (123456)"],
        "temat": message.Tytul,
        "tresc": message.Tresc.replaceAll("\n", "<br>"),
        "odczytana": true,
        "zalaczniki": [
            {
                "url": "https://1drv.ms/u/s!AmvjLDq5anT2psJ4nujoBUyclWOUhw",
                "nazwaPliku": "nazwa_pliku.pptx",
            },
            {
                "url": "https://wulkanowy.github.io/",
                "nazwaPliku": "wulkanowy.txt",
            },
            {
                "url": "https://github.com/wulkanowy/wulkanowy",
                "nazwaPliku": "wulkanowy(2).txt",
            }
        ],
        "id": message.WiadomoscId
    });
});

router.all("/api/WiadomoscOdpowiedzPrzekaz", (req, res) => {
    const user = require("../../data/api/ListaUczniow")[1];
    const message = require("../../data/api/messages/WiadomosciOdebrane")[0];
    res.json({
        "data": timestampToIsoTzFormat(message.DataWyslaniaUnixEpoch),
        "apiGlobalKey": fromString(message.WiadomoscId.toString()),
        "uzytkownikSkrzynkaGlobalKey": fromString(user.Id.toString()),
        "nadawcaSkrzynkaGlobalKey": fromString(message.NadawcaId.toString()),
        "nadawcaSkrzynkaNazwa": "Natalia Wrzesień - P - (123456)",
        "adresaci": [
            {
                "skrzynkaGlobalKey": fromString(user.Id.toString()),
                "nazwa": "Jan Kowalski - U - (123456)"
            }
        ],
        "temat": message.Tytul,
        "tresc": message.Tresc.replaceAll("\n", "<br>"),
        "zalaczniki": [
            {
                "url": "https://1drv.ms/u/s!AmvjLDq5anT2psJ4nujoBUyclWOUhw",
                "nazwaPliku": "nazwa_pliku.pptx"
            }
        ],
        "id": message.WiadomoscId
    });
});

router.all("/api/Pracownicy", (req, res) => {
    const user = require("../../data/api/ListaUczniow")[1];
    const recipients = require("../../data/api/dictionaries/Pracownicy");
    res.json(recipients.map(item => {
        return {
            "skrzynkaGlobalKey": fromString(item.Id.toString()),
            "nazwa": `${item.Nazwisko} ${item.Imie} - P - (${user.JednostkaSprawozdawczaSkrot})`
        };
    }));
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
