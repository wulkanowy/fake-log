const { Router } = require('express');
const { createEnvelope } = require('./utils');

const router = Router();

router.all('/timeslot', (_req, res) => {
  const timeSlots = require('../../../data/timeslots.json');
  res.json(
    createEnvelope(
      0,
      'OK',
      'IEnumerable`1',
      timeSlots.map((timeSlot) => ({
        Display: `${timeSlot.start}-${timeSlot.end}`,
        End: timeSlot.end,
        Id: timeSlot.id,
        Position: timeSlot.number,
        Start: timeSlot.start,
      }))
    )
  );
});

module.exports = router;
