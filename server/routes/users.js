var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var express = require('express'); // TODO: okay in client module?
var session = require('express-session'); // TODO: okay in client module?
var bodyParser = require('body-parser'); // TODO: okay in client module?


/* POST user (login). */
router.post('/', function(req, res, next) {

  // logoff
  if(req.body.logoff) {
    req.session.loggedin = false;
    res.send({loggedin: req.session.loggedin});
    res.end();
    return;
  }

  //login
  var email = req.body.email;
	var password = req.body.password;
  console.log("Login:" + email + " -> " + password);


  let db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  if (email && password) {
    db.serialize(() => {
      db.get('SELECT * FROM users WHERE email = ? AND password = ? AND mailvalid <> 0', [email, password], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        if(row) {
          req.session.loggedin = true;
          req.session.email = email;
          res.send({loggedin: req.session.loggedin});
        } else {
          res.send('could not log in (no user or wrong password)');
        }
        res.end();
      });
    });
	} else {
		res.send('could not log in');
		res.end();
  }
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("Get Users" + req.session.loggedin);
  res.send({loggedin: req.session.loggedin});
  res.end();
});

module.exports = router;
