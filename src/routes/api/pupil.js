const { Router } = require('express')
const { createEnvelope } = require('./utils')

const router = Router()

router.all('/byId', (_req, res) => {
  const students = require('../../../data/students.json')
  const student = students[0]
  res.json(
    createEnvelope(0, 'OK', 'PupilPayload', {
      Id: student.id,
      LoginId: student.loginId,
      LoginValue: student.loginValue,
      FirstName: student.firstName,
      SecondName: student.secondName,
      Surname: student.lastName,
      Sex: student.sex,
    })
  )
})

module.exports = router
