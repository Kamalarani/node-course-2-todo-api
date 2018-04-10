var mongoose = require("mongoose");

var user = mongoose.model("User",{
  email:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
}
});

/*(var user = new user({
  email:"xxxx@example.com"
});

user.save().then((docs) => {
  console.log("User Saved As A Database",docs);
},(err) => {
  console.log("unable to save the user database",err);
});*/

module.exports = {user};
