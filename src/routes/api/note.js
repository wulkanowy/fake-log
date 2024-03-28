const { Router } = require('express');
const { createEnvelope, createTeacher, createDateTime, createSubject, createNoteCategory } = require('./utils');
const { fromString } = require('uuidv4');

const router = Router();

router.all('/byPupil', (_req, res) => {
  const notes = require('../../../data/notes.json');
  res.json(
    createEnvelope(
      0,
      'OK',
      'IEnumerable`1',
      notes.map((note) => ({
        Id: note.id,
        Key: fromString(note.id.toString()),
        IdPupil: note.pupilId,
        Positive: note.positive,
        DateVaild: createDateTime(note.vaildAt),
        DateModify: createDateTime(note.modifyAt),
        Creator: createTeacher(note.creatorId),
        Category: createNoteCategory(note.categoryId),
        Content: note.content,
        Points: note.points,
      }))
    )
  );
});

router.all('/byId', (_req, res) => {
  const notes = require('../../../data/notes.json');
  const note = notes[0];
  res.json(
    createEnvelope(0, 'OK', 'NotePayload', {
      Id: note.id,
      Key: fromString(note.id.toString()),
      IdPupil: note.pupilId,
      Positive: note.positive,
      DateVaild: createDateTime(note.vaildAt),
      DateModify: createDateTime(note.modifyAt),
      Creator: createTeacher(note.creatorId),
      Category: createNoteCategory(note.categoryId),
      Content: note.content,
      Points: note.points,
    })
  );
});

router.all('/deleted/byPupil', (_req, res) => {
  res.json(createEnvelope(0, 'OK', 'IEnumerable`1', require('../../../data/deleted.json')));
});

module.exports = router;
