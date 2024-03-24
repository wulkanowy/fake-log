const { Router } = require("express");

const router = Router({ mergeParams: true });

router.use((req, res, next) => {
  if (req.params.customerSymbol !== "123456")
    res.status(409).json({ message: "Brak uprawnień." });
  next()
});

router.all("/Context", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Context.json"));
});

router.all("/Cache", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Cache.json"));
});

router.all("/OkresyKlasyfikacyjne", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/OkresyKlasyfikacyjne.json"));
});

router.all("/Zebrania", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Zebrania.json"));
});

router.all("/SprawdzianyZadaniaDomowe", (_req, res) => {
  res.json(
    require("../../../data/uonetplus-uczenplus/SprawdzianyZadaniaDomowe.json").map(
      (event) => {
        event.data = new Date().toISOString();
        return event;
      }
    )
  );
});

router.all("/SprawdzianSzczegoly", (_req, res) => {
  const data = require("../../../data/uonetplus-uczenplus/SprawdzianSzczegoly.json");
  data.data = new Date().toISOString();
  res.json(data);
});

router.all("/ZadanieDomoweSzczegoly", (_req, res) => {
  const data = require("../../../data/uonetplus-uczenplus/ZadanieDomoweSzczegoly.json");
  data.data = new Date().toISOString();
  res.json(data);
});

router.all("/Oceny", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Oceny.json"));
});

router.all("/Frekwencja", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Frekwencja.json"));
});

router.all("/Uwagi", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Uwagi.json"));
});

router.all("/Nauczyciele", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Nauczyciele.json"));
});

router.all("/Informacje", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Informacje.json"));
});

router.all("/WiadomosciNieodczytane", (_req, res) => {
  res.json({ liczbaNieodczytanychWiadomosci: 2 });
});

router.all("/DostepOffice", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/DostepOffice.json"));
});

router.all("/ZarejestrowaneUrzadzenia", (_req, res) => {
  res.json(
    require("../../../data/uonetplus-uczenplus/ZarejestrowaneUrzadzenia.json")
  );
});

router.all("/PodrecznikiLataSzkolne", (_req, res) => {
  res.json(
    require("../../../data/uonetplus-uczenplus/PodrecznikiLataSzkolne.json")
  );
});

router.all("/SzczesliwyNumerTablica", (_req, res) => {
  res.json(
    require("../../../data/uonetplus-uczenplus/SzczesliwyNumerTablica.json")
  );
});

router.all("/WazneDzisiajTablica", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/WazneDzisiajTablica.json"));
});

router.all("/WychowawcyTablica", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/WychowawcyTablica.json"));
});

router.all("/RealizacjaZajec", (_req, res) => {
  res.json(
    require("../../../data/uonetplus-uczenplus/RealizacjaZajec.json").map(
      (lesson) => {
        lesson.data = new Date().toISOString();
        return lesson;
      }
    )
  );
});

router.all("/PlanZajec", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/PlanZajec.json"));
});

router.all("/DniWolne", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/DniWolne.json"));
});

router.all("/*", (_req, res) => {
  res.status(404).send({ message: "Nie odnaleziono zasobu." });
});

module.exports = router;
