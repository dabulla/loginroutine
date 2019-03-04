var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mailValidationRouter = require('./routes/mailvalidation');

var sqlite3 = require('sqlite3').verbose();
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(session({ secret: 'secret3d', cookie: { maxAge: 60000 }}))
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

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
app.use('/mailvalidation', mailValidationRouter);

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

// maxAge: new Date(Date.now() + 3600000),
/*app.use(express.session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));*/


let db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
//db.run('create table if not exists users (email VARCHAR NOT NULL UNIQUE, password CHAR(256), validemail BOOL)')
db.run('create table if not exists users (email TEXT NOT NULL UNIQUE, password TEXT, mailvalid INT)', (err, result) => {
  if (err) throw err;
  console.log("created table or already existed");
  // INSERT Testuser
  db.run('INSERT INTO users (email, password, mailvalid) VALUES (\'info@danielbulla.de\', \'test123\', 1)', (err, result) => {
    //if (err) throw err;
    console.log("inserted");
  });
});


module.exports = app;
