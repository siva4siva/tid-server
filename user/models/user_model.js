const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{
    type: String,
    required: [true,'Name field is required']
  },
  username:{
    type: String,
     unique : true,
    required: [true,'username field is required']
  },
  password:{
    type: String,
    required: [true,'password field is required']
  },
  email:{
    type: String,
    required: [true,'email field is required']
  },
  avatar:{
    type: String,
    default: ' '
  },
  usertype:{
      type: String,
      enum: ['superAdmin','admin', 'endUser'],
      required: [true,'user type field is required']
  },
  createdAt:{
        type: Date,
        default: Date.now
  }
});

const user = mongoose.model('user',UserSchema);

module.exports = user;
