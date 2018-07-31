
const user = require('../models/user_model');
const bcrypt = require('bcrypt');

exports.getAllUser = function(req,res,next){
  user.find({}).then(function(users){
    res.send(users);
  }).catch(next);
};

exports.createNewUser = function(req,res,next){
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  req.body.avatar = req.file.filename;
  user.create(req.body).then(function(user){
    res.send(user);
  }).catch(next);
};

exports.myprofile = function(req,res,next){
  user.find({_id: req.current_user.user_id}, { password: 0})
  .then(function(user){
    res.send(user);
  }).catch(next);
}

exports.updateUserById = function(req,res,next){
  req.body.updatedAt = Date.now();
  user.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
    user.findOne({_id: req.params.id}).then(function(users){ 
      res.send(users);
    });
  }).catch(next);
};

exports.deleteUserById = function(req,res,next){
  user.findByIdAndRemove({_id: req.params.id}).then(function(users){
    res.send(users);
  }).catch(next);
};
