//Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var register = require('./routes/register');

//Instantiate server
var app = express();

// view engine setup
//Template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', register);

/* OU
app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200);
  res.render('register')
});
*/

app.post('/register', async function(req, res){
  // Can't be undefined
  console.log(req.body);
  
  const account = require("./models/account")
  account.create(req.body, function(){
    console.log("OK 3")
    res.redirect("/");
  })
})

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
