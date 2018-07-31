const express = require('express');
const multer = require('multer');

const userRouter = express.Router();
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

const userController = require('../controllers/user_controller');
const auth = require('../../check-auth');

userRouter.get('/',userController.getAllUser);

// users
userRouter.get('/users',userController.getAllUser);

userRouter.get('/myprofile',auth.isLogin,userController.myprofile);

userRouter.post('/',auth.isAdmin, profilePicUpload.single('profilePic'), userController.createNewUser);

userRouter.put('/:id',auth.isLogin,userController.updateUserById);

userRouter.delete('/:id',userController.deleteUserById);

module.exports = userRouter;
