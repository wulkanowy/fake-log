const { Router } = require('express');
const { createEnvelope, createDateTime } = require('./utils');

const router = Router();

router.all('/byPupil', (_req, res) => {
  const meetings = require('../../../data/meetings.json');
  res.json(
    createEnvelope(
      0,
      'OK',
      'IEnumerable`1',
      meetings.map((meeting) => ({
        Id: meeting.id,
        Why: meeting.subject,
        When: createDateTime(meeting.date),
        Where: meeting.place,
        Agenda: meeting.agenda,
        Online: meeting.online,
        AdditionalInfo: meeting.additionalInfo,
      }))
    )
  );
});

router.all('/byId', (_req, res) => {
  const meetings = require('../../../data/meetings.json');
  const meeting = meetings[0];
  res.json(
    createEnvelope(0, 'OK', 'MeetingPayload', {
      Id: meeting.id,
      Why: meeting.subject,
      When: createDateTime(meeting.date),
      Where: meeting.place,
      Agenda: meeting.agenda,
      Online: meeting.online,
      AdditionalInfo: meeting.additionalInfo,
    })
  );
});

router.all('/deleted/byPupil', (_req, res) => {
  res.json(createEnvelope(0, 'OK', 'IEnumerable`1', require('../../../data/deleted.json')));
});

module.exports = router;
