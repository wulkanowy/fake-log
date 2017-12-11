import express from 'express';
import path from 'path'
import logger from "morgan";
// import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import sassMiddleware from "node-sass-middleware";

import subdomain from "express-subdomain";
import index from "./routes/index";
import cufs from "./routes/cufs";
import uonetplus from "./routes/uonetplus";
import uonetplusOpiekun from "./routes/uonetplus-opiekun";
import uonetplusUzytkownik from "./routes/uonetplus-uzytkownik";

const app = express();

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

app.use((req, res, next) => {
  res.locals.uonetplusUrl = "http://" + req.get('host').replace("uonetplus-opiekun", "uonetplus");
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
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
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
