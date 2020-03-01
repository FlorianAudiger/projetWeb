//Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var routeUsers = require('./routes/users');
var logout = require('./routes/logout');
var routeUsers2 = require('./routes/users2');
var setting = require('./routes/setting');



//Instantiate server
var app = express();

// view engine setup
// Template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
// router
app.use('/', indexRouter);
app.use('/register', register);
app.use('/login', login);
app.use('/program', routeUsers);
app.use('/logout', logout);
app.use('/exercise', routeUsers2);
app.use('/setting', setting);

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
