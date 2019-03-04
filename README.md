# loginroutine

## Installation

```
npm install
npm install -g nodemon
npm start
```

## Server
Server runs on port 3001. It uses a sqlite database that is automatically created on the first run to store users.
Moreover there is a hardcoded testuser for testing purposes.
The sample tries to use REST api and use the correct http verbs.

## Client

The client uses react and react bootstrap.
"Forgot Password" should be a link in the future, it has no function yet.

The "Register" button uses the mail and password in the formular and creates an user with invalid mail.
By accessing the Url http://{server}:3001/mailvalidation?email={email}&secret={anything} the user's email can be validated. A proper secret is not yet created, passwords are not encrypted.

Remember me does not yet work.
There is no nice mechanism for checking login-state when accessing sites yet, it's just an "if" inside one react component.

used time: 5 hours.