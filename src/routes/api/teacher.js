const { Router } = require('express')
const { createEnvelope } = require('./utils')
const { getByValue } = require('../../utils/dictMap')

const router = Router()

router.all('/byPeriod', (_req, res) => {
  const teachers = require('../../../data/teachers.json')
  const unit = require('../../../data/unit.json')
  const subjects = require('../../../data/subjects.json')
  res.json(
    createEnvelope(0, 'OK', 'IEnumerable`1', [
      ...teachers.map((teacher) => ({
        Id: teacher.id,
        Name: teacher.firstName,
        Surname: teacher.lastName,
        DisplayName: `${teacher.firstName} ${teacher.lastName}`,
        Description: getByValue(subjects, 'id', teacher.subjectId).name,
        Position: 1,
      })),
      ...unit.headmasterIds.map((headmasterId) => ({
        Id: headmasterId,
        Name: null,
        Surname: null,
        DisplayName: `${getByValue(teachers, 'id', headmasterId).firstName} ${
          getByValue(teachers, 'id', headmasterId).lastName
        }`,
        Description: 'Dyrektor',
        Position: 2,
      })),
      ...unit.pedagogueIds.map((pedagogueId) => ({
        Id: pedagogueId,
        Name: getByValue(teachers, 'id', pedagogueId).firstName,
        Surname: getByValue(teachers, 'id', pedagogueId).lastName,
        DisplayName: `${getByValue(teachers, 'id', pedagogueId).firstName} ${
          getByValue(teachers, 'id', pedagogueId).lastName
        }`,
        Description: 'Pedagog',
        Position: 3,
      })),
    ])
  )
})

module.exports = router
