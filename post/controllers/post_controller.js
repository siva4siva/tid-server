const post = require('../models/post_model');

exports.getAllPost = function (req, res, next) {
  post.find({}).then(function (post) {
    res.send(post);
  }).catch(next);
};

exports.getPostByType = function (req, res, next) {
  post.find({post_type: req.params.type}).then(function (post) {
    res.send(post);
  }).catch(next);
};

exports.getPostBySlug = function (req, res, next) {
  post.find({post_slug: req.params.slug}).then(function (post) {
    res.send(post);
  }).catch(next);
};

exports.createNewPost = function (req, res, next) {
  var postTitle = req.body.post_title;
  req.body.post_slug = postTitle.toLowerCase().replace(/[^a-zA-Z0-9]+/g,'_')
  post.create(req.body).then(function (post) {
    res.send(post);
  }).catch(next);
};

exports.updatePostById = function(req,res,next){
  req.body.updatedAt = Date.now();
  post.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
    post.findOne({_id: req.params.id}).then(function(post){
      res.send(post);
    });
  }).catch(next);
};

exports.deletePostById = function(req,res,next){
  post.findByIdAndRemove({_id: req.params.id}).then(function(post){
    res.send(post);
  }).catch(next);
};
