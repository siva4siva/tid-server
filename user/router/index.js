const express = require('express');
//const router = express.Router();
const userApp = express();
userApp.get('/home',function(req,res,next){
  res.send('Hi Rest User');
});
userApp.use('/',require('./user_router'));
userApp.use('/auth/',require('./auth_router'));
userApp.use(function(err,req,res,next){
  res.send('Error : '+err.message);
});
module.exports = userApp;
