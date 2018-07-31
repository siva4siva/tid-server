const express = require('express');
const postApp = express();



postApp.get('/home',function(req,res,next){
  res.send('Hi Rest User');
});
postApp.use('/',require('./post_router'));
module.exports = postApp;