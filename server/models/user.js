const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require("bcryptjs");

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

UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: { token  }
    }
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

UserSchema.statics.findByCredentials = function(email,password) {
  var User = this;

return  User.findOne({email}).then((user)=> {
  if(!user){
    return Promise.reject();
  }
  return new Promise((resolve,reject) => {
    bcrypt.compare (password ,user.password, (err,res)=>{
      if(res){
        resolve(user);
      }else{
        reject();
      }
    });
  });
});
};

UserSchema.pre('save' , function (next) {
  var user = this;
  if(user.modified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

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
