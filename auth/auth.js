const bcrypt = require("bcrypt");
const userModel = require("../models/staffModel");
const jwt = require("jsonwebtoken");

exports.login = function (req, res, next) {
    let username = req.body.username;
    console.log(username)
    let password = req.body.password;
    console.log(password)

    userModel.lookup(username, function (err, user) {
        if (err) {
            console.log("error looking up user", err);
            return res.status(401).send();
        }
        if (!user) {
            console.log("user ", username, " not found");
            return res.render("login");
        }
        else { console.log(user) };


        //compare provided password with stored password
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {

                console.log('user exists')
                //use the payload to store information about the user such as username.
                let payload = { username: username };
                //create the access token 
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                res.cookie("jwt", accessToken);
                next();
            } else {
                console.log('failed login');
                return res.render("login");
            }
        })
    });
};

exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
        console.log('no access Token')
      return res.status(403).send();
    }
    let payload;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (e) {
      //if an error occured return request unauthorized error
      res.status(401).send();
    }
  };