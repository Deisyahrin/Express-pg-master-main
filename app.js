var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersGamerRouter = require('./routes/usersGamer');
var usersGamerBiodata = require('./routes/usersBiodata');
var usersGamerHistory = require('./routes/usersHistory');
var usersGamerLogin = require('./routes/usersLogin');
var usersGamerList = require('./routes/usersList');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users-gamer', usersGamerRouter);
app.use('/users-biodata', usersGamerBiodata);
app.use('/users-history', usersGamerHistory);
app.use('/users-login', usersGamerLogin);
app.use('/users-list', usersGamerList);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
