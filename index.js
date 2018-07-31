var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-Parser');
var cors = require('cors');
var multer = require('multer');
var upload = multer()

var mongoose = require('mongoose');
var mongoDbUri = 'mongodb://localhost/local';
//const mongoDbUri = "mongodb://tid-siva:siva-tid@ds255768.mlab.com:55768/tid-server";



var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(upload.array());

//register static files
app.use(express.static('uploads/profilepic'))

mongoose.connect(mongoDbUri,function(err){
  if(err){
    console.log('Error : '+err);
  }
});
mongoose.promise = global.promise;


//Routing
app.get('/',function(req,res){
  res.send('hello tid');
});

app.use('/api/user/',require('./user/router/index'));
app.use('/api/post/',require('./post/router/index'));
app.use(function(err,req,res,next){
  res.status(400).send('Error : '+err.message);
});
app.listen(process.env.port || 4000 , function(req){
  console.log("app listening to port :4000 ");
});
