var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

/* GET. This is a dummy due to time reasons :(. Secret does not work */
router.get('/', function(req, res, next) {

  var email = req.query.email;
  var secret = req.query.secret;
  console.log("Validate:" + email + " -> " + secret);


  let db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  if (email && secret) {
    db.serialize(() => {
        db.run('UPDATE users SET mailvalid = 1 WHERE email = ? AND mailvalid = 0', [email], function(err, row) {
            if (err) {
                return console.error(err.message);
            }
            if(row) {
                req.session.loggedin = false;
                req.session.mailvalid = true;
                req.session.email = email;
                res.send({loggedin: req.session.loggedin, mailvalid: req.session.mailvalid});
            } else {
                res.send('E-mail validated');
            }
            res.end();
            console.log("E-Mail validated");
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
