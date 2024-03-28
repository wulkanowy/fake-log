const { Router } = require('express');
const protocol = require('../utils/connection');

const router = Router();

router.get('/', (req, res) => {
  const base = protocol(req) + '://' + req.get('host') + '/powiatwulkanowy/123456';
  res.json({
    loginEndpoint: base + '/LoginEndpoint.aspx',
    app: base + '/App',
    api: [
      base + '/api/Context',
      base + '/api/Cache',
      base + '/api/OkresyKlasyfikacyjne',
      base + '/api/Zebrania',
      base + '/api/SprawdzianyZadaniaDomowe',
      base + '/api/SprawdzianSzczegoly',
      base + '/api/ZadanieDomoweSzczegoly',
      base + '/api/Uwagi',
      base + '/api/Frekwencja',
      base + '/api/Oceny',
      base + '/api/Nauczyciele',
      base + '/api/Informacje',
      base + '/api/NieprzeczytaneWiadomosci',
      base + '/api/DostepOffice',
      base + '/api/ZarejestrowaneUrzadzenia',
      base + '/api/PodrecznikiLataSzkolne',
      base + '/api/SzczesliwyNumerTablica',
      base + '/api/WazneDzisiajTablica',
      base + '/api/WychowawcyTablica',
      base + '/api/RealizacjaZajec',
      base + '/api/PlanZajec',
      base + '/api/DniWolne',
    ].sort(),
  });
});

router.all('/LoginEndpoint.aspx', (req, res) => {
  res.redirect(protocol(req) + '://' + req.get('host') + '/powiatwulkanowy/123456/App');
});

router.all('/App', (_req, res) => {
  res.render('uczenplus/app');
});

router.all('/api/Context', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/Context.json'));
});

router.all('/api/Cache', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/Cache.json'));
});

router.all('/api/OkresyKlasyfikacyjne', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/OkresyKlasyfikacyjne.json'));
});

router.all('/api/Zebrania', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/Zebrania.json'));
});

router.all('/api/SprawdzianyZadaniaDomowe', (_req, res) => {
  res.json(
    require('../../data/uonetplus-uczenplus/SprawdzianyZadaniaDomowe.json').map((event) => {
      event.data = new Date().toISOString();
      return event;
    })
  );
});

router.all('/api/SprawdzianSzczegoly', (_req, res) => {
  const data = require('../../data/uonetplus-uczenplus/SprawdzianSzczegoly.json');
  data.data = new Date().toISOString();
  res.json(data);
});

router.all('/api/ZadanieDomoweSzczegoly', (_req, res) => {
  const data = require('../../data/uonetplus-uczenplus/ZadanieDomoweSzczegoly.json');
  data.data = new Date().toISOString();
  res.json(data);
});

router.all('/api/Oceny', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/Oceny.json'));
});

router.all('/api/Frekwencja', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/Frekwencja.json'));
});

router.all('/api/Uwagi', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/Uwagi.json'));
});

router.all('/api/Nauczyciele', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/Nauczyciele.json'));
});

router.all('/api/Informacje', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/Informacje.json'));
});

router.all('/api/WiadomosciNieodczytane', (_req, res) => {
  res.json({ liczbaNieodczytanychWiadomosci: 2 });
});

router.all('/api/DostepOffice', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/DostepOffice.json'));
});

router.all('/api/ZarejestrowaneUrzadzenia', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/ZarejestrowaneUrzadzenia.json'));
});

router.all('/api/PodrecznikiLataSzkolne', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/PodrecznikiLataSzkolne.json'));
});

router.all('/api/SzczesliwyNumerTablica', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/SzczesliwyNumerTablica.json'));
});

router.all('/api/WazneDzisiajTablica', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/WazneDzisiajTablica.json'));
});

router.all('/api/WychowawcyTablica', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/WychowawcyTablica.json'));
});

router.all('/api/RealizacjaZajec', (_req, res) => {
  res.json(
    require('../../data/uonetplus-uczenplus/RealizacjaZajec.json').map((lesson) => {
      lesson.data = new Date().toISOString();
      return lesson;
    })
  );
});

router.all('/api/PlanZajec', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/PlanZajec.json'));
});

router.all('/api/DniWolne', (_req, res) => {
  res.json(require('../../data/uonetplus-uczenplus/DniWolne.json'));
});

router.all('/api/*', (_req, res) => {
  res.status(404).send({ message: 'Nie odnaleziono zasobu.' });
});

module.exports = router;
