const { uuid, fromString } = require('uuidv4');
const { getTime, format } = require('date-fns');
const { getByValue } = require('../../utils/dictMap');

exports.createEnvelope = (statusCode, statusMessage, type, body) => {
  return {
    Envelope: body,
    EnvelopeType: type,
    InResponseTo: null,
    RequestId: uuid(),
    Status: {
      Code: statusCode,
      Message: statusMessage,
    },
    Timestamp: getTime(new Date()),
    TimestampFormatted: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  };
};

exports.createDateTime = (date) => ({
  Date: format(date, 'yyyy-MM-dd'),
  DateDisplay: format(date, 'dd.MM.yyyy'),
  Time: format(date, 'HH:mm:ss'),
  Timestamp: getTime(date),
});

exports.createGradeCategory = (id) => {
  const gradeCategories = require('../../../data/grade-categories.json');
  const gradeCategory = getByValue(gradeCategories, 'id', id);
  return {
    Id: id,
    Code: gradeCategory.code,
    Name: gradeCategory.name,
  };
};

exports.createSubject = (id) => {
  const subjects = require('../../../data/subjects.json');
  const subject = getByValue(subjects, 'id', id);
  return {
    Id: id,
    Key: fromString(subject.id.toString()),
    Kod: subject.code,
    Name: subject.name,
    Position: subject.position,
  };
};

exports.createTeacher = (id) => {
  const teachers = require('../../../data/teachers.json');
  const teacher = getByValue(teachers, 'id', id);
  return {
    Id: id,
    Name: teacher.firstName,
    Surname: teacher.lastName,
    DisplayName: `${teacher.firstName} ${teacher.lastName}`,
  };
};

exports.createNoteCategory = (id) => {
  const noteCategories = require('../../../data/note-categories.json');
  const noteCategory = getByValue(noteCategories, 'id', id);
  return {
    Id: id,
    Name: noteCategory.name,
    Type: noteCategory.type,
    DefaultPoints: noteCategory.defaultPoints,
  };
};
