const router = require('express').Router()
const protocol = require('../utils/connection')
const { format } = require('date-fns')

router.all('/', (req, res) => {
  const today = format(new Date(), 'yyyy-MM-dd')

  let base = protocol(req) + '://' + req.get('host')
  res.json({
    status: 'success',
    start: base.replace('api.', ''),
    repo: 'https://github.com/wulkanowy/fake-log',
    sdk: 'https://github.com/wulkanowy/sdk',
    docs: 'https://gitlab.com/erupcja/uonet-api-docs',
    'hebe-api': [
      base + '/powiatwulkanowy/api/mobile/register/new',
      base + '/powiatwulkanowy/api/mobile/register/hebe',
      base + '/powiatwulkanowy/123456/api/mobile/register/hebe',
      base + '/powiatwulkanowy/123456/api/mobile/version?app=DzienniczekPlus%202.0',
      base + '/powiatwulkanowy/123456/api/mobile/heartbeat',
      base + '/powiatwulkanowy/123456/api/mobile/internal/time',
      base + '/powiatwulkanowy/123456/api/mobile/school/lucky?constituentId=2&day=' + today,
      base + '/powiatwulkanowy/123456/api/mobile/grade/byPupil?pupilId=1&periodId=12',
      base + '/powiatwulkanowy/123456/api/mobile/grade/byId?pupilId=1&periodId=12&id=1',
      base + '/powiatwulkanowy/123456/api/mobile/grade/deleted/byPupil?pupilId=1&periodId=12',
      base + '/powiatwulkanowy/123456/api/mobile/grade/deleted',
      base + '/powiatwulkanowy/123456/api/mobile/exam/byPupil?pupilId=1',
      base + '/powiatwulkanowy/123456/api/mobile/exam/byId?pupilId=1&id=1',
      base + '/powiatwulkanowy/123456/api/mobile/exam/deleted/byPupil?pupilId=1',
      base + '/powiatwulkanowy/123456/api/mobile/exam/deleted',
      base + '/powiatwulkanowy/123456/api/mobile/dictionary/timeslot',
      base + '/powiatwulkanowy/123456/api/mobile/homework/byPupil?pupilId=1',
      base + '/powiatwulkanowy/123456/api/mobile/homework/deleted/byPupil?pupilId=1',
      base + '/powiatwulkanowy/123456/api/mobile/homework/deleted',
      base + '/powiatwulkanowy/123456/api/mobile/note/byPupil?pupilId=1',
      base + '/powiatwulkanowy/123456/api/mobile/note/byId?pupilId=1&id=1',
      base + '/powiatwulkanowy/123456/api/mobile/note/deleted/byPupil?pupilId=1',
      base + '/powiatwulkanowy/123456/api/mobile/pupil/byId?id=1',
    ].sort(),
    'efebmobile-api': [
      base + '/powiatwulkanowy/mobile-api/Uczen.v3.UczenStart/Certyfikat',
      base + '/powiatwulkanowy/mobile-api/Uczen.v3.UczenStart/ListaUczniow',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/LogAppStart',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Slowniki',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/PlanLekcjiZeZmianami',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Oceny',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/OcenyPodsumowanie',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Sprawdziany',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/UwagiUcznia',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Frekwencje',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/ZadaniaDomowe',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/Nauczyciele',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/WiadomosciOdebrane',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/WiadomosciWyslane',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/WiadomosciUsuniete',
      base + '/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen/DodajWiadomosc',
    ],
  })
})

// v3
router.use('/powiatwulkanowy/mobile-api/Uczen.v3.UczenStart', require('./mobile-api/register'))
router.use('/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen', require('./mobile-api/student'))
router.use('/powiatwulkanowy/123456/mobile-api/Uczen.v3.Uczen', require('./mobile-api/messages'))
router.use('/powiatwulkanowy/123456/mobile-api/Push.v1.Push', require('./mobile-api/push'))

// hebe
router.use('/powiatwulkanowy/api/mobile/register', require('./api/register'))
router.use('/powiatwulkanowy/123456/api/mobile/register', require('./api/register'))
router.use('/powiatwulkanowy/123456/api/mobile', require('./api/student'))
router.use('/powiatwulkanowy/123456/api/mobile/grade', require('./api/grade'))
router.use('/powiatwulkanowy/123456/api/mobile/exam', require('./api/exam'))
router.use('/powiatwulkanowy/123456/api/mobile/dictionary', require('./api/dictionary'))
router.use('/powiatwulkanowy/123456/api/mobile/school', require('./api/school'))
router.use('/powiatwulkanowy/123456/api/mobile/homework', require('./api/homework'))
router.use('/powiatwulkanowy/123456/api/mobile/note', require('./api/note'))
router.use('/powiatwulkanowy/123456/api/mobile/pupil', require('./api/pupil'))

router.all('/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not implemented yet',
  })
})

module.exports = router
