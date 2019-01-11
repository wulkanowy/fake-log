const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');
const {format, fromUnixTime, getYear, addYears, addMonths} = require('date-fns');

router.get("/", (req, res) => {
    const base = protocol(req) + "://" + req.get('host') + "/Default/123456";
    res.json({
        status: "sucess",
        data: {
            endpoints: [
                "/Diety.mvc/Get",
                "/EgzaminySemestralne.mvc/Get",
                "/EgzaminyZewnetrzne.mvc/Get",
                "/EwidencjaObecnosci.mvc/Get",
                "/FormularzeSzablony.mvc/Get",
                "/FormularzeSzablonyDownload.mvc/Get",
                "/FormularzeWysylanie.mvc/Get",
                "/FormularzeWysylanie.mvc/Post",
                "/Frekwencja.mvc/Get",
                "/FrekwencjaStatystyki.mvc/Get",
                "/FrekwencjaStatystykiPrzedmioty.mvc/Get",
                "/Jadlospis.mvc/Get",
                "/LekcjeZrealizowane.mvc/GetPrzedmioty",
                "/LekcjeZrealizowane.mvc/GetZrealizowane",
                "/Oceny.mvc/Get",
                "/OkresyUmowOplat.mvc/Get",
                "/Oplaty.mvc/Get",
                "/PlanZajec.mvc/Get",
                "/Pomoc.mvc/Get",
                "/RejestracjaUrzadzeniaToken.mvc/Get",
                "/RejestracjaUrzadzeniaToken.mvc/Delete",
                "/RejestracjaUrzadzeniaTokenCertyfikat.mvc/Get",
                "/Sprawdziany.mvc/Get",
                "/Statystyki.mvc/GetOcenyCzastkowe",
                "/Statystyki.mvc/GetOcenyRoczne",
                "/Statystyki.mvc/GetPunkty",
                "/SzkolaINauczyciele.mvc/Get",
                "/Uczen.mvc/Get",
                "/UczenCache.mvc/Get",
                "/UczenDziennik.mvc/Get",
                "/Usprawiedliwienia.mvc/Post",
                "/UwagiIOsiagniecia.mvc/Get",
                "/ZadaniaDomowe.mvc/Get",
                "/ZarejestrowaneUrzadzenia.mvc/Get",
                "/ZarejestrowaneUrzadzenia.mvc/Delete",
                "/ZgloszoneNieobecnosci.mvc/Get",
                "/ZgloszoneNieobecnosci.mvc/Post"
            ].map(item => {
                return base + item;
            })
        }
    });
});

router.all("/UczenCache.mvc/Get", (req, res) => {
    res.json({
        "data": {
            "czyOpiekun": false,
            "czyJadlospis": false,
            "czyOplaty": false,
            "poryLekcji": require("../../data/api/dictionaries/PoryLekcji").map(item => {
                return {
                    Id: item.Id,
                    Numer: item.Numer,
                    Poczatek: "1900-01-01 " + item.PoczatekTekst + ":00",
                    Koniec: "1900-01-01 " + item.KoniecTekst + ":00",
                    DataModyfikacji: "1900-01-01 00:00:00",
                    IdJednostkaSprawozdawcza: 1,
                    Nazwa: "" + item.Numer,
                    OkresDataOd: fromUnixTime(item.OkresDataOd)
                };
            }),
            "pokazLekcjeZrealizowane": true,
            "serverDate": format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }, "success": true,
    });
});

router.all("/UczenDziennik.mvc/Get", (req, res) => {
    res.json({
        "data": require('../../data/api/ListaUczniow').reduce((res, current) => {
            return res.concat(Array(current.OkresPoziom).fill(current)).map((item, i, array) => {
                return {
                    // jshint ignore:start
                    ...item,
                    // jshint ignore:end
                    OkresPoziom: i + 1 - 4,
                    IdOkresKlasyfikacyjny: (i + 1) * 2,
                    year: getYear(fromUnixTime(item.OkresDataOd)) + i - array.length + 1,
                    OkresDataOd: addYears(fromUnixTime(item.OkresDataOd), i - array.length + 1),
                    OkresDataDo: addYears(fromUnixTime(item.OkresDataDo), i - array.length + 1)
                };
            }).reverse();
        }, []).map(item => {
            return {
                Id: item.OkresPoziom,
                IdUczen: item.Id,
                UczenImie: item.Imie,
                UczenImie2: item.Imie2,
                UczenNazwisko: item.Nazwisko,
                IsDziennik: true,
                IdDziennik: (item.OkresNumer === 1 ? item.IdOkresKlasyfikacyjny : item.IdOkresKlasyfikacyjny - 1),
                IdPrzedszkoleDziennik: 0,
                Poziom: item.OkresPoziom,
                Symbol: item.OddzialSymbol,
                Nazwa: null,
                DziennikRokSzkolny: item.year,
                Okresy: [
                    item.OkresNumer === 1 ? item.IdOkresKlasyfikacyjny : item.IdOkresKlasyfikacyjny - 1,
                    item.OkresNumer === 2 ? item.IdOkresKlasyfikacyjny : item.IdOkresKlasyfikacyjny + 1
                ].map((semesterId, i) => {
                    return {
                        NumerOkresu: i + 1,
                        Poziom: item.OkresPoziom,
                        DataOd: format(addMonths(item.OkresDataOd, i * 5), 'yyyy-MM-dd HH:mm:ss'),
                        DataDo: format(addMonths(item.OkresDataDo, i * 7), 'yyyy-MM-dd HH:mm:ss'),
                        IdOddzial: item.IdOddzial,
                        IdJednostkaSprawozdawcza: item.IdJednostkaSprawozdawcza,
                        IsLastOkres: i === 1,
                        Id: semesterId
                    };
                }),
                "IdSioTyp": 11,
                "IsDorosli": false,
                "IsPolicealna": false,
                "Is13": false,
                "IsArtystyczna": false,
                "IsArtystyczna13": false,
                "IsSpecjalny": false,
                "IsPrzedszkola": false,
                "UczenPelnaNazwa": `${item.OkresPoziom}${item.OddzialSymbol} ${item.year} - ${item.Imie} ${item.Nazwisko}`
            };
        }),
        "success": true
    });
});

router.all("/Home.mvc/RefreshSession", (req, res) => {
    res.json({
        "data": {},
        "success": true
    });
});

router.all("/Diety.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/EgzaminySemestralne.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/EgzaminyZewnetrzne.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/EwidencjaObecnosci.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/FormularzeSzablony.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/FormularzeSzablonyDownload.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/FormularzeWysylanie.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/FormularzeWysylanie.mvc/Post", (req, res) => {
    res.json({});
});

router.all("/Frekwencja.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/FrekwencjaStatystyki.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/FrekwencjaStatystykiPrzedmioty.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/Jadlospis.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/LekcjeZrealizowane.mvc/GetPrzedmioty", (req, res) => {
    res.json({});
});

router.all("/LekcjeZrealizowane.mvc/GetZrealizowane", (req, res) => {
    res.json({});
});

router.all("/Oceny.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/OkresyUmowOplat.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/Oplaty.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/PlanZajec.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/Pomoc.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/RejestracjaUrzadzeniaToken.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/RejestracjaUrzadzeniaToken.mvc/Delete", (req, res) => {
    res.json({});
});

router.all("/RejestracjaUrzadzeniaTokenCertyfikat.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/Sprawdziany.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/Statystyki.mvc/GetOcenyCzastkowe", (req, res) => {
    res.json({});
});

router.all("/Statystyki.mvc/GetOcenyRoczne", (req, res) => {
    res.json({});
});

router.all("/Statystyki.mvc/GetPunkty", (req, res) => {
    res.json({});
});

router.all("/SzkolaINauczyciele.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/Uczen.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/Usprawiedliwienia.mvc/Post", (req, res) => {
    res.json({});
});

router.all("/UwagiIOsiagniecia.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/ZadaniaDomowe.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/ZarejestrowaneUrzadzenia.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/ZarejestrowaneUrzadzenia.mvc/Delete", (req, res) => {
    res.json({});
});

router.all("/ZgloszoneNieobecnosci.mvc/Get", (req, res) => {
    res.json({});
});

router.all("/ZgloszoneNieobecnosci.mvc/Post", (req, res) => {
    res.json({});
});

module.exports = router;
