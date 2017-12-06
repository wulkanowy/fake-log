var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var subdomain = require('express-subdomain');

var index = require('./routes/index');
var cufs = require('./routes/cufs');
var uonetplus = require('./routes/uonetplus');
var uonetplusOpiekun = require('./routes/uonetplus-opiekun');
var uonetplusUzytkownik = require('./routes/uonetplus-uzytkownik');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.mainHost = "http://" + req.get('host')
    .replace(/(cufs|uonetplus|uonetplus-opiekun|uonetplus-uzytkownik)\./, "");
  next();
});

app.use(subdomain('cufs', cufs));
app.use(subdomain('uonetplus', uonetplus));
app.use(subdomain('uonetplus-opiekun', uonetplusOpiekun));
app.use(subdomain('uonetplus-uzytkownik', uonetplusUzytkownik));
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (typeof(PhusionPassenger) !== 'undefined') {
  app.listen('passenger');
}

module.exports = app;
