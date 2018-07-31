const user = require('../models/user_model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.login = function (req, res, next) {
  if (!req.body.hasOwnProperty('username') || req.body.username == '') {
    res.send("please enter username");
  }
  if (!req.body.hasOwnProperty('password') || req.body.password == '') {
    res.send("please enter password");
  }

  user.findOne({ username: req.body.username }).then(function (users) {
    if (!users) {
      var response = {
        'message': 'plz sign up with this username'
      };
      res.send(response);
    }
    if (bcrypt.compareSync(req.body.password, users.password)) {
      var token = jwt.sign({
        user_id: users._id, user_name: users.name,
        user_type: users.usertype
      }, 'tid-server', { expiresIn: '10h' });
      var response = {
        'userType': users.usertype,
        'userId': users._id,
        'name': users.name,
        'avatar': users.avatar,
        'message': 'auth success',
        'token': token
      };
      res.send(response);
    } else {
      var response = {
        'message': 'auth failed'
      };
      res.send(response);
    }
  });
};

exports.register = function (req, res, next) {
  if (!req.file) {
    res.send({ message: "profile pic needed" });
  }
  req.body.avatar = req.file.filename;
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  req.body.usertype = 'endUser';
  user.create(req.body).then(function (user) {
    res.send(user);
  }).catch(next);
};
