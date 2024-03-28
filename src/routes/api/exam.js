const { Router } = require('express');
const { createEnvelope, createTeacher, createDateTime, createSubject } = require('./utils');
const { fromString } = require('uuidv4');

const router = Router();

router.all('/byPupil', (_req, res) => {
  const exams = require('../../../data/exams.json');
  res.json(
    createEnvelope(
      0,
      'OK',
      'IEnumerable`1',
      exams.map((exam) => ({
        Content: exam.description,
        Creator: createTeacher(exam.creatorId),
        DateCreated: createDateTime(new Date(exam.createdAt)),
        DateModify: createDateTime(new Date(exam.modifyAt)),
        Deadline: createDateTime(new Date()),
        Id: exam.id,
        Key: fromString(exam.id.toString()),
        PupilId: exam.id,
        Subject: createSubject(exam.subjectId),
        Type: exam.type === 2 ? 'Sprawdzian' : exam.type === 3 ? 'Kartkówka' : 'Praca klasowa',
      }))
    )
  );
});

router.all('/byId', (_req, res) => {
  const exams = require('../../../data/exams.json');
  const exam = exams[0];
  res.json(
    createEnvelope(0, 'OK', 'ExamPayload', {
      Content: exam.description,
      Creator: createTeacher(exam.creatorId),
      DateCreated: createDateTime(new Date(exam.createdAt)),
      DateModify: createDateTime(new Date(exam.modifyAt)),
      Deadline: createDateTime(new Date()),
      Id: exam.id,
      Key: fromString(exam.id.toString()),
      PupilId: exam.id,
      Subject: createSubject(exam.subjectId),
      Type: exam.type === 2 ? 'Sprawdzian' : exam.type === 3 ? 'Kartkówka' : 'Praca klasowa',
    })
  );
});

router.all('/deleted/byPupil', (_req, res) => {
  res.json(createEnvelope(0, 'OK', 'IEnumerable`1', require('../../../data/deleted.json')));
});

router.all('/deleted', (_req, res) => {
  res.json(createEnvelope(0, 'OK', 'IEnumerable`1', require('../../../data/deleted.json')));
});

module.exports = router;
