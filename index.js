var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config");
var app = express();
var morgan = require("morgan");

var authenticateController = require("./controllers/authenticate-controller");
var registerController = require("./controllers/register-controller");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan("dev"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/" + "./public/index.html");
});

app.get("/signup.html", function(req, res) {
  res.sendFile(__dirname + "/" + "./public/signup.html");
});

app.get("/login.html", function(req, res) {
  res.sendFile(__dirname + "/" + "./public/login.html");
});

/* route to handle login and registration */
app.post("/api/register", registerController.register);
app.post("/api/login", authenticateController.authenticate);
app.listen(8012);
