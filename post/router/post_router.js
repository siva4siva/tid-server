const express = require('express');
const multer = require('multer');
var upload = multer();

const postRouter = express.Router();
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./uploads/postpic')
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

const postPicUpload = multer({
  storage: storage,
  limits:{
      fileSize:1024 * 1024 * 5
  },
  fileFilter: filefilter
});

const userController = require('../controllers/post_controller');

postRouter.get('/',userController.getAllPost);
postRouter.get('/type/:type',userController.getPostByType);
postRouter.get('/:slug',userController.getPostBySlug);
postRouter.post('/',userController.createNewPost);
postRouter.put('/:id',userController.updatePostById);
postRouter.delete('/:id',userController.deletePostById);

module.exports = postRouter;