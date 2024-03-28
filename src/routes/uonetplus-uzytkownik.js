const express = require('express');
const router = express.Router();
const protocol = require('../utils/connection');
const converter = require('../utils/converter');
const { getRandomInt } = require('../utils/api');
const md5 = require('md5');

router.get('/', (req, res) => {
  res.render('messages');
});

router.get('/-endpoints', (req, res) => {
  const base = protocol(req) + '://' + req.get('host') + '/powiatwulkanowy';
  res.json({
    status: 'sucess',
    data: {
      endpoints: [
        '/Wiadomosc.mvc/GetInboxMessages',
        '/Wiadomosc.mvc/GetOutboxMessages',
        '/Wiadomosc.mvc/GetTrashboxMessages',
        '/Adresaci.mvc/GetAddressee',
        '/Wiadomosc.mvc/GetAdresaciWiadomosci',
        '/Wiadomosc.mvc/GetMessageSenderRoles',
        '/Wiadomosc.mvc/GetInboxMessageDetails',
        '/Wiadomosc.mvc/GetOutboxMessageDetails',
        '/Wiadomosc.mvc/GetTrashboxMessageDetails',
        '/Wiadomosc.mvc/GetAdresaciNiePrzeczytaliWiadomosci',
        '/Wiadomosc.mvc/GetAdresaciPrzeczytaliWiadomosc',
        '/Wiadomosc.mvc/GetMessageAddressee',
        '/Wiadomosc.mvc/DeleteInboxMessages',
        '/Wiadomosc.mvc/DeleteOutboxMessages',
        '/Wiadomosc.mvc/DeleteTrashboxMessages',
        '/NowaWiadomosc.mvc/GetJednostkiUzytkownika',
        '/NowaWiadomosc.mvc/InsertWiadomosc',
      ].map((item) => {
        return base + item;
      }),
    },
  });
});

router.get('/Wiadomosc.mvc/GetInboxMessages', (req, res) => {
  res.json({
    success: true,
    data: require('../../data/api/messages/WiadomosciOdebrane').map((item) => {
      const recipientsNumber = getRandomInt(60, 100);
      const readBy = getRandomInt(20, 60);
      const unreadBy = recipientsNumber - readBy;
      return {
        Id: item.WiadomoscId * 2,
        Nieprzeczytana: !item.GodzinaPrzeczytania,
        Nieprzeczytane: unreadBy,
        Przeczytane: readBy,
        Data: converter.formatDate(new Date(item.DataWyslaniaUnixEpoch * 1000), true) + ' 00:00:00',
        Tresc: null,
        Temat: item.Tytul,
        Nadawca: {
          Id: '' + item.NadawcaId,
          Name: item.Nadawca,
          IdLogin: item.NadawcaId,
          Unreaded: false,
          Date: null,
          Role: 2,
          PushMessage: false,
          UnitId: 0,
          Hash: 'abcdef=',
        },
        IdWiadomosci: item.WiadomoscId,
        HasZalaczniki: true,
        FolderWiadomosci: 1,
        Adresaci: [],
      };
    }),
  });
});

router.get('/Wiadomosc.mvc/GetOutboxMessages', (req, res) => {
  res.json({
    success: true,
    data: require('../../data/api/messages/WiadomosciWyslane').map((item) => {
      return {
        Id: item.WiadomoscId * 2,
        Nieprzeczytana: !item.GodzinaPrzeczytania,
        Nieprzeczytane: parseInt(item.Nieprzeczytane, 10),
        Przeczytane: parseInt(item.Przeczytane, 10),
        Data: converter.formatDate(new Date(item.DataWyslaniaUnixEpoch * 1000), true) + ' 00:00:00',
        Tresc: null,
        Temat: item.Tytul,
        Nadawca: {
          Id: '' + item.NadawcaId,
          Name: item.Nadawca,
          IdLogin: item.NadawcaId,
          Unreaded: false,
          Date: null,
          Role: 2,
          PushMessage: false,
          UnitId: 0,
          Hash: 'abcdef=',
        },
        IdWiadomosci: item.WiadomoscId,
        HasZalaczniki: false,
        FolderWiadomosci: 2,
        Adresaci: [],
      };
    }),
  });
});

router.get('/Wiadomosc.mvc/GetTrashboxMessages', (req, res) => {
  res.json({
    success: true,
    data: require('../../data/api/messages/WiadomosciUsuniete').map((item) => {
      return {
        Id: item.WiadomoscId * 2,
        Nieprzeczytana: !item.GodzinaPrzeczytania,
        Nieprzeczytane: parseInt(item.Nieprzeczytane, 10),
        Przeczytane: parseInt(item.Przeczytane, 10),
        Data: converter.formatDate(new Date(item.DataWyslaniaUnixEpoch * 1000), true) + ' 00:00:00',
        Tresc: null,
        Temat: item.Tytul,
        Nadawca: {
          Id: '' + item.NadawcaId,
          Name: item.Nadawca,
          IdLogin: item.NadawcaId,
          Unreaded: false,
          Date: null,
          Role: 2,
          PushMessage: false,
          UnitId: 0,
          Hash: 'abcdef=',
        },
        IdWiadomosci: item.WiadomoscId,
        HasZalaczniki: false,
        FolderWiadomosci: 3,
        Adresaci: [],
      };
    }),
  });
});

router.get('/NowaWiadomosc.mvc/GetJednostkiUzytkownika', (req, res) => {
  const user = require('../../data/api/ListaUczniow')[1];
  res.json({
    success: true,
    data: [
      {
        IdJednostkaSprawozdawcza: user.IdJednostkaSprawozdawcza,
        Skrot: user.JednostkaSprawozdawczaSkrot,
        Role: [1],
        NazwaNadawcy: user.Imie + ' ' + user.Nazwisko,
        WychowawcaWOddzialach: [],
        Id: user.Id,
      },
    ],
  });
});

router.all('/Adresaci.mvc/GetAddressee', (req, res) => {
  const user = require('../../data/api/ListaUczniow')[1];
  res.json({
    success: true,
    data: require('../../data/api/dictionaries/Pracownicy').map((item) => {
      return {
        Id: `${item.Id}rPracownik`,
        Name: `${item.Imie} ${item.Nazwisko} [${item.Kod}] - pracownik (${user.JednostkaSprawozdawczaSkrot})`,
        IdLogin: item.Id,
        UnitId: user.IdJednostkaSprawozdawcza,
        Role: 2,
        PushMessage: null,
        Hash: Buffer.from(md5(item.Id)).toString('base64'),
      };
    }),
  });
});

router.get(['/Wiadomosc.mvc/GetAdresaciWiadomosci', '/Wiadomosc.mvc/GetMessageSenderRoles'], (req, res) => {
  const user = require('../../data/api/ListaUczniow')[1];
  res.json({
    success: true,
    data: require('../../data/api/dictionaries/Pracownicy')
      .slice(0, 2)
      .map((item) => {
        return {
          Id: `${item.Id}rPracownik`,
          Name: `${item.Imie} ${item.Nazwisko} [${item.Kod}] - pracownik (${user.JednostkaSprawozdawczaSkrot})`,
          IdLogin: item.Id,
          UnitId: null,
          Role: 2,
          PushMessage: null,
          Hash: Buffer.from(md5(item.Id)).toString('base64'),
        };
      }),
  });
});

router.all(
  [
    '/Wiadomosc.mvc/GetInboxMessageDetails',
    '/Wiadomosc.mvc/GetOutboxMessageDetails',
    '/Wiadomosc.mvc/GetTrashboxMessageDetails',
  ],
  (req, res) => {
    const message = require('../../data/api/messages/WiadomosciOdebrane')[0];
    res.json({
      success: true,
      data: {
        Id: message.WiadomoscId,
        Tresc: message.Tresc,
        Zalaczniki: [
          {
            Url: 'https://1drv.ms/u/s!AmvjLDq5anT2psJ4nujoBUyclWOUhw',
            IdOneDrive: '0123456789ABCDEF!123',
            IdWiadomosc: message.WiadomoscId,
            NazwaPliku: 'nazwa_pliku.pptx',
            Id: message.WiadomoscId * 3,
          },
          {
            Url: 'https://wulkanowy.github.io/',
            IdOneDrive: '0123456789ABCDEF!124',
            IdWiadomosc: message.WiadomoscId,
            NazwaPliku: 'wulkanowy.txt',
            Id: message.WiadomoscId * 4,
          },
          {
            Url: 'https://github.com/wulkanowy/wulkanowy',
            IdOneDrive: '0123456789ABCDEF!125',
            IdWiadomosc: message.WiadomoscId,
            NazwaPliku: 'wulkanowy(2).txt',
            Id: message.WiadomoscId * 5,
          },
        ],
      },
    });
  }
);

router.all('/Wiadomosc.mvc/GetAdresaciNiePrzeczytaliWiadomosci', (req, res) => {
  const user = require('../../data/api/ListaUczniow')[1];
  const recipient = require('../../data/api/dictionaries/Pracownicy')[0];
  res.json({
    success: true,
    data: [
      {
        Id: `${recipient.Id * 4}`, // ¯\_(ツ)_/¯
        Name: `${recipient.Imie} ${recipient.Nazwisko} [${recipient.Kod}] - pracownik (${user.JednostkaSprawozdawczaSkrot})`,
        IdLogin: recipient.Id,
        UnitId: user.IdJednostkaSprawozdawcza,
        Role: 2,
        PushMessage: null,
        Hash: Buffer.from(md5(recipient.Id)).toString('base64'),
      },
    ],
  });
});

router.all('/Wiadomosc.mvc/GetAdresaciPrzeczytaliWiadomosc', (req, res) => {
  const user = require('../../data/api/ListaUczniow')[1];
  const recipient = require('../../data/api/dictionaries/Pracownicy')[1];
  res.json({
    success: true,
    data: [
      {
        Nazwa: `${recipient.Imie} ${recipient.Nazwisko} [${recipient.Kod}] - pracownik (${user.JednostkaSprawozdawczaSkrot})`,
        Data: '2020-04-07 19:05:00',
        Id: recipient.Id * 8, // ¯\_(ツ)_/¯
      },
    ],
  });
});

router.all('/Wiadomosc.mvc/GetMessageAddressee', (req, res) => {
  const user = require('../../data/api/ListaUczniow')[1];
  const recipient = require('../../data/api/dictionaries/Pracownicy')[1];
  res.json({
    success: true,
    data: [
      {
        Id: recipient.Id * 8, // ¯\_(ツ)_/¯
        Name: `${recipient.Imie} ${recipient.Nazwisko} [${recipient.Kod}] - pracownik (${user.JednostkaSprawozdawczaSkrot})`,
        IdLogin: recipient.LoginId,
        Role: 7,
        Hash: 'abcd==',
      },
    ],
  });
});

router.all(
  [
    '/Wiadomosc.mvc/DeleteInboxMessages',
    '/Wiadomosc.mvc/DeleteOutboxMessages',
    '/Wiadomosc.mvc/DeleteTrashboxMessages',
  ],
  (req, res) => {
    res.json({
      success: true,
    });
  }
);

router.all('/NowaWiadomosc.mvc/InsertWiadomosc', (req, res) => {
  let data = req.body.incomming;
  res.json({
    success: true,
    data: {
      Adresaci: data.Adresaci.map((item) => {
        item.PushMessage = false;
        return item;
      }),
      Temat: data.Temat,
      Tresc: data.Tresc,
      Nadawca: {
        Id: null,
        Name: 'Kowalski Jan',
        IdLogin: 0,
        UnitId: null,
        Role: 0,
        PushMessage: null,
        Hash: 'hash',
      },
      WiadomoscPowitalna: false,
      Id: data.Id,
    },
  });
});

module.exports = router;
