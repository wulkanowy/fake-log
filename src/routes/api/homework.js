const { Router } = require('express')
const { createEnvelope, createTeacher, createDateTime, createSubject } = require('./utils')
const { fromString } = require('uuidv4')

const router = Router()

router.all('/byPupil', (_req, res) => {
  const homework = require('../../../data/homework.json')
  res.json(
    createEnvelope(
      0,
      'OK',
      'IEnumerable`1',
      homework.map((item) => ({
        AnswerDate: item.answer.date,
        Attachments: item.attachments, // TODO: attachments
        Content: item.description,
        Creator: createTeacher(item.creatorId),
        Date: createDateTime(new Date()),
        Deadline: createDateTime(new Date()),
        Id: item.studentHomeworkId,
        IdHomework: item.homeworkId,
        IdPupil: item.pupilId,
        IsAnswerRequired: item.isAnswerRequired,
        Key: fromString(item.studentHomeworkId.toString()),
        Subject: createSubject(item.subjectId),
      }))
    )
  )
})

router.all('/deleted/byPupil', (_req, res) => {
  res.json(createEnvelope(0, 'OK', 'IEnumerable`1', require('../../../data/deleted.json')))
})

router.all('/deleted', (_req, res) => {
  res.json(createEnvelope(0, 'OK', 'IEnumerable`1', require('../../../data/deleted.json')))
})

module.exports = router
