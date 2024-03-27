const { Router } = require('express');
const { createEnvelope, createDateTime, createGradeCategory, createSubject, createTeacher } = require("./utils");
const { fromString } = require('uuidv4');

const router = Router();

router.get("/byPupil", (_req, res) => {
  const grades = require("../../../data/grades.json");
  res.json(createEnvelope(0, "OK", "IEnumerable`1", grades.subjects.flatMap(gradesSubject => gradesSubject.partialGrades.map(grade => ({
    Column: {
      Category: createGradeCategory(grade.column.categoryId),
      Code: grade.column.code,
      Group: grade.column.group,
      Id: grade.column.id,
      Key: fromString(grade.column.id.toString()),
      Name: grade.column.name,
      Number: grade.column.number,
      Period: grade.column.periodId,
      Subject: createSubject(gradesSubject.subjectId),
      Weight: grade.column.weight
    },
    Comment: grade.comment,
    Content: grade.content,
    ContentRaw: grade.contentRaw,
    Creator: createTeacher(grade.creatorId),
    Modifier: createTeacher(grade.modifierId),
    DateCreated: createDateTime(grade.createdAt),
    DateModify: createDateTime(grade.modifyAt),
    Id: grade.id,
    Key: fromString(grade.id.toString()),
    Numerator: grade.numerator,
    Denominator: grade.denominator,
    PupilId: grade.pupilId,
    Value: grade.value
  })))));
});

router.get("/byId", (_req, res) => {
  const grades = require("../../../data/grades.json");
  const gradesSubject = grades.subjects[0];
  const grade = gradesSubject.partialGrades[0];
  res.json(createEnvelope(0, "OK", "GradePayload", {
    Column: {
      Category: createGradeCategory(grade.column.categoryId),
      Code: grade.column.code,
      Group: grade.column.group,
      Id: grade.column.id,
      Key: fromString(grade.column.id.toString()),
      Name: grade.column.name,
      Number: grade.column.number,
      Period: grade.column.periodId,
      Subject: createSubject(gradesSubject.subjectId),
      Weight: grade.column.weight
    },
    Comment: grade.comment,
    Content: grade.content,
    ContentRaw: grade.contentRaw,
    Creator: createTeacher(grade.creatorId),
    Modifier: createTeacher(grade.modifierId),
    DateCreated: createDateTime(grade.createdAt),
    DateModify: createDateTime(grade.modifyAt),
    Id: grade.id,
    Key: fromString(grade.id.toString()),
    Numerator: grade.numerator,
    Denominator: grade.denominator,
    PupilId: grade.pupilId,
    Value: grade.value
  }));
});

router.all("/deleted/byPupil", (_req, res) => { res.json(createEnvelope(0, "OK", "IEnumerable`1", require("../../../data/deleted.json"))) })

router.all("/deleted", (_req, res) => { res.json(createEnvelope(0, "OK", "IEnumerable`1", require("../../../data/deleted.json"))) })

router.all("/summary/byPupil", (_req, res) => {
  const grades = require("../../../data/grades.json");
  res.json(createEnvelope(0, "OK", "IEnumerable`1",
    grades.subjects.map(gradesSubject => ({
      Id: gradesSubject.subjectId,
      PupilId: 1,
      PeriodId: 12,
      Subject: createSubject(gradesSubject.subjectId),
      DateModify: createDateTime(new Date("1970-01-01T00:00:00")),
      Entry_1: gradesSubject.proposedGrade ?? gradesSubject.proposedPointsGrade,
      Entry_2: gradesSubject.finalGrade ?? gradesSubject.finalPointsGrade,
      Entry_3: gradesSubject.points
    }))
  ));
})

module.exports = router;