//Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var toobusy = require('toobusy-js');

var home = require('./routes/home');
var routeUsers = require('./routes/users');
var routeUsers2 = require('./routes/users2');

//Instantiate server
var app = express();

// view engine setup
// Template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Security
app.use(bodyParser.urlencoded({ limit: "1kb" }));
app.use(bodyParser.json({ limit: "1kb" }));

/**** Router ****/
app.use('/', home);
app.use('/register', home);
app.use('/login', home);
app.use('/logout', home);
app.use('/setting', home);

// Users
app.use('/program', routeUsers);
app.use('/exercise', routeUsers2);
/****/

//Security
app.use(function(req, res, next) {
  if (toobusy()) {
      // log if you see necessary
      res.status(503)
      res.render('error',{title: "Erreur"});
  } else {
  next();
  }
});

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
  res.render('error',{title: "Erreur"});
});

app.listen(process.env.PORT || 4000)
module.exports = app;
