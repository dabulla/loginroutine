var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var email = req.body.email;
	var password = req.body.password;
  console.log("Login:" + email + " -> " + password);

  if (username && password) {
		/*connection.query('SELECT * FROM users WHERE email = ? AND password = ? AND mailvalid = true', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/');
			} else {
				response.send('could not log in (no user or wrong password');
			}
			response.end();
		});*/
	} else {
		response.send('could not log in');
		response.end();
  }
});

module.exports = router;
