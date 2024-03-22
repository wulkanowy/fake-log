const { Router } = require("express");
const protocol = require("../utils/connection");

const router = Router();

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
    ],
  });
});

router.all("/LoginEndpoint.aspx", (req, res) => {
  res.redirect(
    protocol(req) + "://" + req.get("host") + "/powiatwulkanowy/123456/App"
  );
});

router.all("/App", (_req, res) => {
  res.render("uczenplus/app");
});

router.all("/api/Context", (_req, res) => {
  res.json(require("../../data/uonetplus-uczenplus/Context.json"));
});

router.all("/api/Cache", (_req, res) => {
  res.json(require("../../data/uonetplus-uczenplus/Cache.json"));
});

router.all("/api/OkresyKlasyfikacyjne", (_req, res) => {
  res.json(require("../../data/uonetplus-uczenplus/OkresyKlasyfikacyjne.json"));
});

router.all("/api/*", (_req, res) => {
  res.status(404).send({ message: "Nie odnaleziono zasobu." });
});

module.exports = router;
