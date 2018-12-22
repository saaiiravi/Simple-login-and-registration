var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../config');

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
module.exports.authenticate = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;


  connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
    if (error) {

      console.log("check1")
      res.json({
        status: false,
        message: 'there are some error with query'
      })
    } else {

      if (results.length > 0) {

        decryptedString = cryptr.decrypt(results[0].password);
        if (password == decryptedString) {
          var token = makeid();
          console.log("the both values are " + email + token);
          connection.query('INSERT INTO tokens VALUES(?,?);', [email.toString(), token.toString()], function (error, results, fields) {
            if (error) {
              console.log("check2")
              res.status(201).json({
                status: false,
                message: 'there are some error with query'
              })
            } else {
              res.cookie("token", token);
              res.status(200).json({
                status: true,
                message: token.toString()
              });
            }
          });

        } else {
          res.status(201).json({
            //status: false,
            message: "Email and password does not match"
          });
        }

      } else {
        res.status(201).json({
          //status: false,
          message: "Email does not exits"
        });
      }
    }
  });
}