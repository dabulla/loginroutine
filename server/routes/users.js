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
    res.send({loggedin: req.session.loggedin, mailvalid: req.session.mailvalid});
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
          req.session.mailvalid = true;
          req.session.email = email;
          res.send({loggedin: req.session.loggedin, mailvalid: req.session.mailvalid});
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

/* GET users listing. NOT NEEDED*/
router.get('/', function(req, res, next) {
  res.send({loggedin: req.session.loggedin, mailvalid: req.session.mailvalid});
  res.end();
});

/* GET users listing. */
router.put('/', function(req, res, next) {
  var email = req.body.email;
	var password = req.body.password;
  console.log("Register:" + email + " -> " + password);


  let db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  if (email && password) {
    db.serialize(() => {
      db.run('INSERT INTO users (email, password, mailvalid) VALUES (?, ?, 0)', [email, password], (err, result) => {
        if (err) {
          // TODO: Add error message "already registered" and success
          res.send({loggedin: req.session.loggedin, mailvalid: req.session.mailvalid});
          res.end();
          console.log("error");
          return
        }
        req.session.loggedin = false;
        req.session.mailvalid = false;
        req.session.email = email;
        res.send({loggedin: req.session.loggedin, mailvalid: req.session.mailvalid});
        res.end();
        console.log("inserted");
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

module.exports = router;
