const router = require('express').Router({})
const protocol = require('../../utils/connection')
const { createEnvelope, createDateTime } = require('./utils')

router.all('/new', (req, res) => {
  const login = require('../../../data/login.json')
  const base = protocol(req) + '://' + req.get('host')

  res.json(
    createEnvelope(0, 'OK', 'AccountPayload', {
      LoginId: login.loginId,
      RestURL: base + '/powiatwulkanowy/',
      UserLogin: login.loginValue,
      UserName: login.loginValue,
    })
  )
})

router.all('/hebe', (req, res) => {
  const students = require('../../../data/students.json')
  const base = protocol(req) + '://' + req.get('host')
  const unit = require('../../../data/unit.json')
  const login = require('../../../data/login.json')
  const teachers = require('../../../data/teachers.json')
  const constituentUnit = require('../../../data/constituent-unit.json')
  res.json(
    createEnvelope(
      0,
      'OK',
      'IEnumerable`1',
      students.map((student) => ({
        TopLevelPartition: student.customerDb,
        Partition: `${student.customerDb}-${student.customerSymbol}`,
        Links: {
          Group: student.customerDb,
          Symbol: student.customerSymbol,
          Alias: null,
          QuestionnaireRoot: base.replace('api', 'uonetplus-ankietyplus'),
        },
        ClassDisplay: student.className,
        InfoDisplay: `${constituentUnit.short} - ${student.className}`,
        FullSync: false,
        SenderEntry: null,
        Login: {
          Id: login.id,
          Value: login.loginValue,
          FirstName: login.firstName,
          SecondName: login.secondName,
          Surname: login.lastName,
          DisplayName: login.fullName,
          LoginRole: login.role,
        },
        Unit: {
          Id: unit.id,
          Symbol: unit.symbol,
          Short: unit.short,
          RestURL: `${base}/${student.customerDb}/${student.customerSymbol}/api`,
          Name: unit.name,
          Address: unit.address,
          Patron: unit.patron,
          DisplayName: unit.fullName,
          SchoolTopic: unit.schoolTopic,
        },
        ConstituentUnit: {
          Id: constituentUnit.id,
          Short: constituentUnit.short,
          Name: constituentUnit.name,
          Address: constituentUnit.address,
          Patron: constituentUnit.patron,
          SchoolTopic: constituentUnit.schoolTopic,
        },
        Capabilities: student.capabilities,
        Educators: [],
        EducatorList: teachers
          .filter((teacher) => teacher.isEducator)
          .map((educator) => ({
            GlobalKey: educator.messageBox.globalKey,
            Name: educator.fullName,
            Group: null,
          })),
        Pupil: {
          Id: student.id,
          LoginId: student.loginId,
          LoginValue: student.loginValue,
          FirstName: student.firstName,
          SecondName: student.secondName,
          Surname: student.lastName,
          Sex: student.sex,
        },
        CeretakerId: null,
        Periods: student.periods.map((period) => ({
          Capabilities: period.capabilities,
          Id: period.id,
          Level: period.level,
          Number: period.number,
          Start: createDateTime(new Date(period.start)),
          End: createDateTime(new Date(period.end)),
          Current: period.current,
          Last: period.last,
        })),
        Journal: {
          Id: student.register.id,
          YearStart: createDateTime(new Date(student.register.start)),
          YearEnd: createDateTime(new Date(student.register.end)),
        },
        Constraints: {
          AbsenceDaysBefore: null,
          AbsenceHoursBefore: null,
        },
        State: 0,
        Policies: {
          Privacy: null,
          Cookie: null,
          InfoEnclosure: null,
          AccessDeclaration: null,
        },
        Context: '',
        MessageBox: {
          Id: student.messageBox.id,
          GlobalKey: student.messageBox.globalKey,
          Name: student.messageBox.name,
        },
      }))
    )
  )
})

module.exports = router
