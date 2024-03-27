const { Router } = require("express");
const { getByValue } = require("../../utils/dictMap");
const { format } = require("date-fns");

const router = Router({ mergeParams: true });

router.use((req, res, next) => {
  if (req.params.customerSymbol !== "123456")
    res.status(409).json({ message: "Brak uprawnień." });
  next();
});

router.all("/Context", (_req, res) => {
  const students = require("../../../data/students.json");
  const unit = require("../../../data/unit.json");
  const login = require("../../../data/login.json");
  res.json({
    uczniowie: students.map(student => ({
      idDziennik: student.register.id,
      rodzajDziennika: student.register.type,
      dziennikDataOd: student.register.start,
      dziennikDataDo: student.register.end,
      isUczen: student.register.type === 1,
      isPrzedszkolak: student.register.type === 2,
      isWychowanek: student.register.type === 3,
      key: student.key,
      uczen: student.fullName,
      oddzial: student.className,
      jednostka: unit.fullName,
      jednostkaGodzinaOd: null,
      jednostkaGodzinaDo: null,
      isDorosli: false,
      isPolicealna: false,
      is13: false,
      isArtystyczna: false,
      isArtystyczna13: false,
      isSpecjalna: false,
      pelnoletniUczen: student.isAdult,
      opiekunUcznia: student.loginId !== login.loginId,
      wymagaAutoryzacji: student.isAuthorizationRequired,
      posiadaPesel: student.hasPesel,
      globalKeySkrzynka: student.messageBox.globalKey,
      config: {
        isOplaty: true,
        isPlatnosci: true,
        isZaplac: true,
        isScalanieKont: true,
        isJadlospis: true,
        isOffice365: true,
        isSynchronizacjaEsb: true,
        isDydaktyka: true,
        isNadzorPedagogiczny: true,
        isZmianaZdjecia: true,
        isZglaszanieNieobecnosci: true,
        isLekcjeZrealizowane: true,
        sLekcjeZaplanowane: true,
        Podreczniki: true,
        oneDriveClientId: "b820a97d-ffc7-4ac7-b505-e1483b3ea9c4",
        projectClient: null,
        payByNetUrlForPayment: "https://pbn-test.paybynet.com.pl/PayByNet/trans.do"
      }
    }))
  });
});

router.all("/Cache", (_req, res) => {
  const unit = require("../../../data/unit.json");
  const login = require("../../../data/login.json");
  res.json({
    units: [
      {
        id: unit.id,
        symbol: unit.symbol,
        skrot: unit.short,
        nazwa: unit.name
      }
    ],
    links: [],
    isStudent: login.role === 'uczen',
    isParent: login.role === 'opiekun',
    isMenu: true,
    isOffice365: true,
    isBetacomOn: false,
    isNadzorOn: false,
    uiisUploadPhotosOn: false,
    isZglaszanieNieobecnosciOn: false,
    isOneDriveAttachmentsHomeworksOn: true,
    isPodrecznikiOn: true
  });
});

router.all("/OkresyKlasyfikacyjne", (_req, res) => {
  const students = require("../../../data/students.json");
  res.json(students[0].periods.map(period => ({
    id: period.id,
    numer: period.number,
    dataOd: period.start,
    dataDo: period.end
  })));
});

router.all("/Zebrania", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Zebrania.json"));
});

router.all("/SprawdzianyZadaniaDomowe", (_req, res) => {
  const exams = require("../../../data/exams.json");
  const homework = require("../../../data/homework.json");
  const subjects = require("../../../data/subjects.json");
  const events = exams.concat(homework);
  res.json(events.map(event => ({
    typ: event.type ?? 4,
    przedmiotNazwa: getByValue(subjects, "id", event.subjectId).name,
    data: (new Date()).toISOString(),
    hasAttachments: Boolean(event.attachments?.length),
    id: event.id
  })))
});

router.all("/SprawdzianSzczegoly", (_req, res) => {
  const exams = require("../../../data/exams.json");
  const subjects = require("../../../data/subjects.json");
  const teachers = require("../../../data/teachers.json");
  const exam = exams[0];
  res.json({
    typ: exam.type,
    data: (new Date()).toISOString(),
    przedmiotNazwa: getByValue(subjects, "id", exam.subjectId).name,
    nauczycielImieNazwisko: `${getByValue(teachers, "id", exam.creatorId).firstName} ${getByValue(teachers, "id", exam.creatorId).lastName}`,
    opis: exam.description,
    sprawdzianModulDydaktyczny: false,
    linki: exam.links,
    id: exam.id
  })
});

router.all("/ZadanieDomoweSzczegoly", (_req, res) => {
  const homework = require("../../../data/homework.json");
  const subjects = require("../../../data/subjects.json");
  const teachers = require("../../../data/teachers.json");
  const item = homework[0];
  res.json({
    typ: 4,
    data: (new Date()).toISOString(),
    terminOdpowiedzi: (new Date()).toISOString(),
    przedmiotNazwa: getByValue(subjects, "id", item.subjectId).name,
    nauczycielImieNazwisko: `${getByValue(teachers, "id", item.creatorId).firstName} ${getByValue(teachers, "id", item.creatorId).lastName}`,
    opis: item.description,
    zalaczniki: item.attachments, // TODO: attachments
    linki: item.links, // TODO: links
    status: item.status,
    odpowiedzWymagana: item.isAnswerRequired,
    zadanieModulDydaktyczny: false,
    odpowiedz: {
      id: item.answer.id,
      status: item.answer.status,
      odpowiedz: item.answer.answer,
      komentarznNauczyciela: item.answer.teacherComment,
      linkiUcznia: item.answer.studentsLinks,
      zalaczniki: item.answer.attachments,
      data: item.answer.date,
      zadanieModulDydaktyczny: false
    },
    id: item.id
  })
});

router.all("/Oceny", (_req, res) => {
  const grades = require("../../../data/grades.json");
  const subjects = require("../../../data/subjects.json");
  const teachers = require("../../../data/teachers.json");
  const gradeCategories = require("../../../data/grade-categories.json");
  res.json({
    ocenyPrzedmioty: grades.subjects.map(gradesSubject => ({
      przedmiotNazwa: getByValue(subjects, 'id', gradesSubject.subjectId).name,
      pozycja: getByValue(subjects, 'id', gradesSubject.subjectId).position,
      nauczyciele: gradesSubject.teacherIds.map(teacherId => {
        const teacher = getByValue(teachers, 'id', teacherId);
        return `${teacher.firstName} ${teacher.lastName} [${teacher.code}]`
      }),
      ocenyCzastkowe: gradesSubject.partialGrades.map(grade => ({
        wpis: grade.content,
        dataOceny: format(new Date(grade.modifyAt), 'dd.MM.yyyy'),
        kategoriaKolumny: getByValue(gradeCategories, 'id', grade.column.categoryId).name,
        nazwaKolumny: grade.column.name,
        waga: grade.column.weight,
        kolorOceny: grade.column.color,
        nauczyciel: `${getByValue(teachers, 'id', grade.modifierId).firstName} ${getByValue(teachers, 'id', grade.modifierId).lastName} [${getByValue(teachers, 'id', grade.modifierId).code}]`,
        zmianaOdOstatniegoLogowania: false
      })),
      egzaminFormaPraktyczna: gradesSubject.exam.practicalForm,
      egzaminFormaUstna: gradesSubject.exam.oralForm,
      egzaminOcenaProponowana: gradesSubject.exam.proposed,
      egzaminOcenaLaczna: gradesSubject.exam.final,
      sumaPunktow: gradesSubject.points,
      srednia: gradesSubject.average,
      proponowanaOcenaOkresowa: gradesSubject.proposedGrade,
      proponowanaOcenaOkresowaPunkty: gradesSubject.proposedPointsGrade,
      ocenaOkresowa: gradesSubject.finalGrade,
      ocenaOkresowaPunkty: gradesSubject.finalPointsGrade,
      podsumowanieOcen: null
    })),
    ustawienia: {
      isPunkty: grades.config.isPoints,
      isSrednia: grades.config.isAverage,
      isDorosli: grades.config.isAdult,
      isOcenaOpisowa: grades.config.isDescriptiveGrade,
      isOstatniOkresKlasyfikacyjny: grades.config.isLastPeriod
    }
  })
});

router.all("/Frekwencja", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Frekwencja.json"));
});

router.all("/FrekwencjaStatystyki", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/FrekwencjaStatystyki.json"));
});

router.all("/Usprawiedliwienia", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Usprawiedliwienia.json"));
});

router.all("/Uwagi", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Uwagi.json"));
});

router.all("/Nauczyciele", (_req, res) => {
  const teachers = require("../../../data/teachers.json");
  const subjects = require("../../../data/subjects.json");
  res.json(teachers.map(teacher => ({
    przedmiot: getByValue(subjects, 'id', teacher.subjectId).name,
    imie: teacher.firstName,
    nazwisko: teacher.lastName,
    wychowawca: teacher.isEducator,
    globalKeySkrzynka: teacher.isEducator ? teacher.messageBox.globalKey : null
  })));
});

router.all("/Informacje", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/Informacje.json"));
});

router.all("/WiadomosciNieodczytane", (_req, res) => {
  res.json({ liczbaNieodczytanychWiadomosci: 2 });
});

router.all("/DostepOffice", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/DostepOffice.json"));
});

router.all("/ZarejestrowaneUrzadzenia", (_req, res) => {
  res.json(
    require("../../../data/uonetplus-uczenplus/ZarejestrowaneUrzadzenia.json")
  );
});

router.all("/PodrecznikiLataSzkolne", (_req, res) => {
  res.json(
    require("../../../data/uonetplus-uczenplus/PodrecznikiLataSzkolne.json")
  );
});

router.all("/SzczesliwyNumerTablica", (_req, res) => {
  res.json(
    require("../../../data/uonetplus-uczenplus/SzczesliwyNumerTablica.json")
  );
});

router.all("/WazneDzisiajTablica", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/WazneDzisiajTablica.json"));
});

router.all("/WychowawcyTablica", (_req, res) => {
  const teachers = require("../../../data/teachers.json");
  res.json(teachers.filter(teacher => teacher.isEducator).map(educator => ({
    imieNazwisko: `${educator.firstName} ${educator.lastName}`,
    isGlowny: true,
    globalKeySkrzynka: educator.messageBox.globalKey
  })));
});

router.all("/RealizacjaZajec", (_req, res) => {
  res.json(
    require("../../../data/uonetplus-uczenplus/RealizacjaZajec.json").map(
      (lesson) => {
        lesson.data = new Date().toISOString();
        return lesson;
      }
    )
  );
});

router.all("/PlanZajec", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/PlanZajec.json"));
});

router.all("/DniWolne", (_req, res) => {
  res.json(require("../../../data/uonetplus-uczenplus/DniWolne.json"));
});

router.all("/*", (_req, res) => {
  res.status(404).send({ message: "Nie odnaleziono zasobu." });
});

module.exports = router;
