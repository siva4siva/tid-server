var jwt = require('jsonwebtoken');

exports.isLogin = function(req,res,next){
  try {
    var token = req.headers.authorization.split(' ')[1];
    req.current_user = jwt.verify(token, 'tid-server');
    next();
  }catch(err) {
    res.send('auth failed');
  }
}

exports.isAdmin = function(req,res,next){
  try {
    var token = req.headers.authorization.split(' ')[1];
    req.current_user = jwt.verify(token, 'tid-server');
    //res.send(req.current_user.user_type);
    if(req.current_user.user_type != 'admin' && req.current_user.user_type != 'superAdmin'){
      res.send('This route need admin access');
    }
    next();
  }catch(err) {
    res.send('auth failed');
  }
}
