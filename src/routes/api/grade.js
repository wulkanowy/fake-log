const { Router } = require('express');
const { createEnvelope, createDateTime } = require("./utils");
const { getByValue } = require("./../../utils/dictMap");

const router = Router();

router.get("/byPupil", (_req, res) => {
  const subjects = require("../../../data/subjects.json");
  const grades = require("../../../data/grades.json");
  const teachers = require("../../../data/teachers.json");

  res.json(createEnvelope(0, "OK", "IEnumerable`1", grades.subjects.flatMap(gradesSubject => gradesSubject.partialGrades.map(grade => ({
    Column: {
      Category: {
        Id: grade.column.category.id,
        Code: grade.column.category.code,
        Name: grade.column.category.name
      },
      Code: grade.column.code,
      Group: grade.column.group,
      Id: grade.column.id,
      Key: grade.column.key,
      Name: grade.column.name,
      Number: grade.column.number,
      Period: grade.column.periodId,
      Subject: {
        Id: gradesSubject.subjectId,
        Key: getByValue(subjects, "id", gradesSubject.subjectId).key,
        Kod: getByValue(subjects, "id", gradesSubject.subjectId).kod,
        Name: getByValue(subjects, "id", gradesSubject.subjectId).name,
        Position: getByValue(subjects, "id", gradesSubject.subjectId).position
      },
      Weight: grade.column.weight
    },
    Comment: grade.comment,
    Content: grade.content,
    ContentRaw: grade.contentRaw,
    Creator: {
      Id: grade.creatorId,
      Name: getByValue(teachers, "id", grade.creatorId).firstName,
      Surname: getByValue(teachers, "id", grade.creatorId).lastName,
      DisplayName: getByValue(teachers, "id", grade.creatorId).fullName
    },
    Modifier: {
      Id: grade.modifierId,
      Name: getByValue(teachers, "id", grade.modifierId).firstName,
      Surname: getByValue(teachers, "id", grade.modifierId).lastName,
      DisplayName: getByValue(teachers, "id", grade.modifierId).fullName
    },
    DateCreated: createDateTime(grade.createdAt),
    DateModify: createDateTime(grade.modifyAt),
    Id: grade.id,
    Key: grade.key,
    Numerator: grade.numerator,
    Denominator: grade.denominator,
    PupilId: grade.pupilId,
    Value: grade.value
  })))));
});

router.get("/byId", (_req, res) => {
  const subjects = require("../../../data/subjects.json");
  const grades = require("../../../data/grades.json");
  const teachers = require("../../../data/teachers.json");
  const gradesSubject = grades.subjects[0];
  const grade = gradesSubject.partialGrades[0];
  res.json(createEnvelope(0, "OK", "GradePayload", {
    Column: {
      Category: {
        Id: grade.column.category.id,
        Code: grade.column.category.code,
        Name: grade.column.category.name
      },
      Code: grade.column.code,
      Group: grade.column.group,
      Id: grade.column.id,
      Key: grade.column.key,
      Name: grade.column.name,
      Number: grade.column.number,
      Period: grade.column.periodId,
      Subject: {
        Id: gradesSubject.subjectId,
        Key: getByValue(subjects, "id", gradesSubject.subjectId).key,
        Kod: getByValue(subjects, "id", gradesSubject.subjectId).kod,
        Name: getByValue(subjects, "id", gradesSubject.subjectId).name,
        Position: getByValue(subjects, "id", gradesSubject.subjectId).position
      },
      Weight: grade.column.weight
    },
    Comment: grade.comment,
    Content: grade.content,
    ContentRaw: grade.contentRaw,
    Creator: {
      Id: grade.creatorId,
      Name: getByValue(teachers, "id", grade.creatorId).firstName,
      Surname: getByValue(teachers, "id", grade.creatorId).lastName,
      DisplayName: getByValue(teachers, "id", grade.creatorId).fullName
    },
    Modifier: {
      Id: grade.modifierId,
      Name: getByValue(teachers, "id", grade.modifierId).firstName,
      Surname: getByValue(teachers, "id", grade.modifierId).lastName,
      DisplayName: getByValue(teachers, "id", grade.modifierId).fullName
    },
    DateCreated: createDateTime(grade.createdAt),
    DateModify: createDateTime(grade.modifyAt),
    Id: grade.id,
    Key: grade.key,
    Numerator: grade.numerator,
    Denominator: grade.denominator,
    PupilId: grade.pupilId,
    Value: grade.value
  }));
});

router.all("/deleted/byPupil", (_req, res) => { res.json(require("../../../data/deleted.json")) })

router.all("/deleted", (_req, res) => { res.json(require("../../../data/deleted.json")) })

module.exports = router;