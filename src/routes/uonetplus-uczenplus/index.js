const { Router } = require("express");
const protocol = require("../../utils/connection");
const apiRouter = require("./api");

const router = Router({ mergeParams: true });

router.use("/api", apiRouter);

router.get("/", (req, res) => {
  const base =
    protocol(req) + "://" + req.get("host") + "/powiatwulkanowy/123456";
  res.json({
    loginEndpoint: base + "/LoginEndpoint.aspx",
    app: base + "/App",
    api: [
      base + "/api/Context",
      base + "/api/Cache",
      base + "/api/OkresyKlasyfikacyjne",
      base + "/api/Zebrania",
      base + "/api/SprawdzianyZadaniaDomowe",
      base + "/api/SprawdzianSzczegoly",
      base + "/api/ZadanieDomoweSzczegoly",
      base + "/api/Uwagi",
      base + "/api/Frekwencja",
      base + "/api/Oceny",
      base + "/api/Nauczyciele",
      base + "/api/Informacje",
      base + "/api/NieprzeczytaneWiadomosci",
      base + "/api/DostepOffice",
      base + "/api/ZarejestrowaneUrzadzenia",
      base + "/api/PodrecznikiLataSzkolne",
      base + "/api/SzczesliwyNumerTablica",
      base + "/api/WazneDzisiajTablica",
      base + "/api/WychowawcyTablica",
      base + "/api/RealizacjaZajec",
      base + "/api/PlanZajec",
      base + "/api/DniWolne",
    ].sort(),
  });
});

router.all("/LoginEndpoint.aspx", (req, res) => {
  if (req.params.customerSymbol !== "123456")
    res.redirect(
      protocol(req) +
        "://" +
        req.get("host").replace("uczenplus", "uczen") +
        `/powiatwulkanowy/${req.params.customerSymbol}/LoginEndpoint.aspx`
    );
  res.redirect(
    protocol(req) + "://" + req.get("host") + "/powiatwulkanowy/123456/App"
  );
});

router.all("/App", (req, res) => {
  if (req.params.customerSymbol !== "123456")
    res.redirect(
      protocol(req) +
        "://" +
        req.get("host").replace("uczenplus", "uczen") +
        `/powiatwulkanowy/${req.params.customerSymbol}/LoginEndpoint.aspx`
    );
  res.render("uczenplus/app");
});

module.exports = router;
