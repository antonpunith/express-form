var express = require('express');
var url = require('url');
var app = express();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

app.use(cookieParser());

app.get('/', function (req, res) {
  var cookie = req.cookies.testCookie;
  console.log('cookies', req.cookies);
  if (cookie === undefined)
  {
    res.cookie("testCookie", "Hello", { maxAge: 900000, httpOnly: true });

  }
  res.send(`
    <form action="login" method="POST">
      <input name="username"/>
      <button type="submit">Submit</button>
    </form>
  `);
  var url_parts = url.parse(req.url, true);
  console.log('url params', url_parts.query);
});

// create application/json parser
var jsonParser = bodyParser.json()
// Handles json data

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Handles form data

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {

  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
  res.send('welcome')
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
