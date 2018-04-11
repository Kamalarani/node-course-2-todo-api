const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email:{
  type: String,
  required: true,
  trim: true,
  minlength: 1,
  unique: true,
  validate:{
    validator: validator.isEmail,
    message: '{value} is not a valid email'
  }
},
password: {
  type: String,
  require: true,
  minlength: 6
},
tokens: [{
  access: {
    type:String,
    required:true
  },
  token:{
    type:String,
    required:true
  }
}]
});

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(),access},'Pass123').toString();

  user.tokens.push({access , token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token,'Pass123');
  }catch(err){
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token':token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model("User",UserSchema);


/*(var user = new user({
  email:"xxxx@example.com"
});

user.save().then((docs) => {
  console.log("User Saved As A Database",docs);
},(err) => {
  console.log("unable to save the user database",err);
});*/

module.exports = {User};
