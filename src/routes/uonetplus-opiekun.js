const express = require('express');
const router = express.Router();
const converter = require('../utils/converter');
const dictMap = require('../utils/dictMap');
const _ = require('lodash');

global.opiekunRoot = "/Default/123456";

router.all("/", (req, res) => {
    res.render("log-exception", {
        title: "Dziennik FakeUONET+",
        message: "Podany identyfikator klienta jest niepoprawny.",
    });
});

router.all("/Default(/123456)?", (req, res) => {
    if (req.header("Referer") || "true" === req.query.login) {
        return res.redirect("/Default/123456/Start/Index/");
    }

    res.render("login", {
        title: "Uczeń"
    });
});

router.get("/Default/123456/Start/Index/", (req, res) => {
    res.cookie("EfebSsoAuthCookie", "asdfasdfasdfasdfasdfasdfas", {
        domain: req.get('host').replace("uonetplus-opiekun", ""),
        path: '/',
        httpOnly: true
    });
    res.cookie("idBiezacyDziennik", "1234");
    res.render("opiekun/start", {title: "Witryna ucznia i rodzica – Strona główna"});
});

router.get("/Default/123456/Uczen/UczenOnChange", (req, res) => {
    res.cookie("idBiezacyUczen", req.query.id);

    res.redirect(req.header("Referer") ? req.header("Referer") : "../?login=true");
});

router.get("/Default/123456/Dziennik/DziennikOnChange", (req, res) => {
    res.cookie("idBiezacyDziennik", req.query.id);

    res.redirect(req.header("Referer") ? req.header("Referer") : "../");
});

router.get("/Default/123456/Uczen.mvc/DanePodstawowe", (req, res) => {
    res.render("opiekun/dane", {
        title: "Witryna ucznia i rodzica – Dane ucznia",
        data: require("../../data/opiekun/dane.json")
    });
});

router.get("/Default/123456/Oceny(\.mvc|)/Wszystkie", (req, res) => {
    let data;
    let viewPath;

    const teachers = require("../../data/api/dictionaries/Nauczyciele");
    const subjects = require("../../data/api/dictionaries/Przedmioty");
    const details = require("../../data/api/student/Oceny");
    const subjectCategories = require("../../data/api/dictionaries/KategorieOcen");
    const summary = require("../../data/api/student/OcenyPodsumowanie");

    if (req.query.details === '2') {
        data = details.map(item => {
            const teacher = dictMap.getByValue(teachers, "Id", item.IdPracownikD);
            return {
                "subject": dictMap.getByValue(subjects, "Id", item.IdPrzedmiot).Nazwa,
                "value": item.Wpis === "" ? item.Komentarz : item.Wpis,
                "color": "000000",
                "symbol": dictMap.getByValue(subjectCategories, "Id", item.IdKategoria).Kod,
                "description": item.Opis,
                "weight": item.Waga,
                "date": converter.formatDate(new Date(item.DataUtworzenia * 1000)),
                "teacher": teacher.Imie + " " + teacher.Nazwisko
            };
        });
        viewPath = "opiekun/oceny-szczegolowy";
    } else {
        viewPath = "opiekun/oceny-skrocony";
        data = subjects.map(item => {
            return {
                "subject": item.Nazwa,
                "average": dictMap.getByValue(summary.SrednieOcen, "IdPrzedmiot", item.Id).Wpis,
                "predictedRating": dictMap.getByValue(summary.OcenyPrzewidywane, "IdPrzedmiot", item.Id).Wpis,
                "finalRating": dictMap.getByValue(summary.OcenyPrzewidywane, "IdPrzedmiot", item.Id).Wpis
            };
        });
    }

    res.render(viewPath, {
        title: "Witryna ucznia i rodzica – Oceny",
        data: data
    });
});

router.get('/Default/123456/Frekwencja.mvc', (req, res) => {
    res.render("opiekun/frekwencja", {
        title: "Witryna ucznia i rodzica – Frekwencja",
        data: require("../../data/opiekun/frekwencja.json"),
        weekDays: converter.getWeekDaysFrom(req.query.data),
        tics: {
            prev: converter.getPrevWeekTick(req.query.data),
            next: converter.getNextWeekTick(req.query.data)
        }
    });
});

router.get("/Default/123456/UwagiOsiagniecia.mvc/Wszystkie", (req, res) => {
    res.render("opiekun/uwagi", {
        title: "Witryna ucznia i rodzica – Uwagi i osiągnięcia",
        notes: require("../../data/api/student/UwagiUcznia").map(item => {
            return {
                date: converter.formatDate(new Date(item.DataWpisuTekst)),
                teacher: item.PracownikImie + " " +  item.PracownikNazwisko,
                category: dictMap.getByValue(require("../../data/api/dictionaries/KategorieUwag"), "Id", item.IdKategoriaUwag).Nazwa,
                content: item.TrescUwagi
            };
        })
    });
});

router.get("/Default/123456/Lekcja(\.mvc|)/PlanZajec", (req, res) => {
    res.render("opiekun/plan-zajec", {
        title: "Witryna ucznia i rodzica – Plan lekcji",
        data: require("../../data/opiekun/plan-zajec.json"),
        weekDays: converter.getWeekDaysFrom(req.query.data),
        tics: {
            prev: converter.getPrevWeekTick(req.query.data),
            next: converter.getNextWeekTick(req.query.data)
        }
    });
});

router.get("/Default/123456/Lekcja(\.mvc|)/Zrealizowane", (req, res) => {
    res.render("opiekun/plan-zrealizowane", {
        title: "Witryna ucznia i rodzica – Plan lekcji",
        subjects: require("../../data/api/dictionaries/Przedmioty"),
        data: _.groupBy(require("../../data/opiekun/plan-zrealizowane.json"), "date")
    });
});

router.get("/Default/123456/Sprawdziany.mvc/Terminarz", (req, res) => {
    res.render("opiekun/sprawdziany", {
        title: "Witryna ucznia i rodzica – Terminarz sprawdzianów",
        data: require("../../data/opiekun/sprawdziany.json"),
        weekDays: converter.getWeekDaysFrom(req.query.data),
        tics: {
            prev: converter.getPrevWeekTick(req.query.data),
            next: converter.getNextWeekTick(req.query.data)
        }
    });
});

router.get("/Default/123456/Sprawdziany.mvc/Terminarz", (req, res) => {
    res.render("opiekun/sprawdziany", {
        title: "Witryna ucznia i rodzica – Terminarz sprawdzianów",
        data: require("../../data/opiekun/sprawdziany.json"),
        weekDays: converter.getWeekDaysFrom(req.query.data),
        tics: {
            prev: converter.getPrevWeekTick(req.query.data),
            next: converter.getNextWeekTick(req.query.data)
        }
    });
});

router.get("/Default/123456/ZadaniaDomowe.mvc", (req, res) => {
    const subjects = require("../../data/api/dictionaries/Przedmioty");
    res.render("opiekun/zadania", {
        title: "Witryna ucznia i rodzica – Zadania domowe",
        homework: require("../../data/api/student/ZadaniaDomowe").map(item => {
            const teacher = dictMap.getByValue(require("../../data/api/dictionaries/Nauczyciele"), "Id", item.IdPracownik);
            const date = converter.getDateString(req.query.data);
            return {
                date: converter.formatDate(date),
                dayName: converter.getDayName(date),
                entryDate: converter.formatDate(new Date(item.DataTekst)),
                teacher: teacher.Imie + " " +  teacher.Nazwisko,
                teacherSymbol: teacher.Kod,
                subject: dictMap.getByValue(subjects, "Id", item.IdPrzedmiot).Nazwa,
                content: item.Opis
            };
        }),
        tics: {
            prev: converter.getPrevDayTick(req.query.data),
            next: converter.getNextDayTick(req.query.data)
        }
    });
});

router.get("/Default/123456/Szkola.mvc/Nauczyciele", (req, res) => {
    const teachers = require("../../data/api/student/Nauczyciele");
    const subjectsDict = require("../../data/api/dictionaries/Przedmioty");
    const teachersDict = require("../../data/api/dictionaries/Pracownicy");

    const headmaster = dictMap.getByValue(teachersDict, "Id", teachers.NauczycieleSzkola[0].IdPracownik);
    const tutor = dictMap.getByValue(teachersDict, "Id", teachers.NauczycieleSzkola[3].IdPracownik);
    res.render("opiekun/szkola", {
        title: "Witryna ucznia i rodzica – Szkoła i nauczyciele",
        headMaster: headmaster.Imie + " " + headmaster.Nazwisko,
        tutor: tutor.Imie + " " + tutor.Nazwisko,
        teachers: teachers.NauczycielePrzedmioty.map(item => {
            const teacher = dictMap.getByValue(teachersDict, "Id", item.IdPracownik);
            return {
                subject: dictMap.getByValue(subjectsDict, "Id", item.IdPrzedmiot).Nazwa,
                name: teacher.Imie + " " + teacher.Nazwisko + " [" + teacher.Kod + "]"
            };
        })
    });
});

router.get("/Default/123456/DostepMobilny.mvc", (req, res) => {
    res.render('opiekun/mobilny');
});

router.get('/Default/123456/DostepMobilny.mvc/Rejestruj', (req, res) => {
    res.render('opiekun/mobilny-rejestruj');
});

router.get('/Default/123456/DostepMobilny.mvc/Wyrejestruj/:id', (req, res) => {
    res.render('opiekun/mobilny-wyrejestruj');
});

router.post("/Default/123456/DostepMobilny.mvc/PotwierdzWyrejestrowanie", (req, res) => {
    res.redirect("/Default/123456/DostepMobilny.mvc");
});

module.exports = router;
