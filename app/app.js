'use strict';

/* eslint-env node */

require('dotenv').load();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const randomString = require('randomstring');
const methodOverride = require('method-override');

const rootDir = 'static';
const index = require('./routes/index');
const api = require('./routes/api');
const app = express();
app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, rootDir, 'favicon.ico')));
app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, rootDir)));

const numKeys = Math.ceil(Math.random() * 10) + 10; // eslint-disable-line no-magic-numbers
const randomKeys = [];
for (let i = 0; i < numKeys; i++) {
  randomKeys.push(randomString.generate());
}
const sessionMiddleware = session({
  keys: randomKeys
});
app.use(sessionMiddleware);

app.use('/', index);
app.use('/api', api);

app.use('*', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, rootDir)
  });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
