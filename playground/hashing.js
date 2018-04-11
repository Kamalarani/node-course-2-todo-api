const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = '123abc!';

/*bcrypt.genSalt(10,(err, salt)=>{
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});*/

var hashedpassword = '$2a$10$ru29dC76qz7KmXEycdRuIuQh6Wj604iv41/yKQi6PfXD4fQMsx4mC';
bcrypt.compare(password , hashedpassword , (err,res) => {
  console.log(res);
});
/*var data = {
  id: 14
};

var token = jwt.sign(data, "Pass123");
console.log(token);

var decoded = jwt.verify(token, "Pass123");
console.log("decoded String :" ,decoded);*/

/*var message = "I am User with number 3";
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
  id: 4
}

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + "SomeSecret").toString()
}

//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();


var resultHash = SHA256(JSON.stringify(token.data) + "SomeSecret").toString();

if(resultHash === token.hash){
  console.log("There Is No Change . Trust It!");
}else{
  console.log("There Is A Change . Dont Trust It!");
}*/
