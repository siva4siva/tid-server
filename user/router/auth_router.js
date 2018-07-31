const express = require('express');

const authRouter = express.Router();

let multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./uploads/profilepic')
  },
  filename: function(req,file,cb){
    var filename = new Date().toDateString() +' '+ file.originalname;
    cb(null, filename);
  }
});

const filefilter = (req,file,cb) => {
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
};

const profilePicUpload = multer({
  storage: storage,
  limits:{
      fileSize:1024 * 1024 * 5
  },
  fileFilter: filefilter
});


const authController = require('../controllers/auth_controller');

// users
authRouter.post('/login',authController.login);

authRouter.post('/signup', profilePicUpload.single('profilepic'), authController.register);

module.exports = authRouter;
