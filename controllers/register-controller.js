var Cryptr = require("cryptr");
var express = require("express");
var connection = require("./../config");
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register = function(req, res) {
  //var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
  var users = {
    name: req.body.name,
    email: req.body.email,
    password: encryptedString
  };
  connection.query("INSERT INTO users SET ?", users, function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.json({
        status: false,
        message: "there is some error with query"
      });
    } else {
      res.json({
        //results.redirect('/index.html');

        message: "user registered sucessfully"
      });
      console.log("registered!");
    }
  });
};
