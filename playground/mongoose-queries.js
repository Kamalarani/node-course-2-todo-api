const {ObjectID} = require("mongodb");

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');
/*
var id = '5acb446d25e7849f48ee213e';

if(!ObjectID.isValid(id)){
  console.log("ID NOT FOUND");
}

/*(Todo.find({
_id : id
}).then((todos) => {
  console.log("TODOS:",todos);
});

Todo.findOne({
  _id : id
}).then((todo) => {
  console.log("TODO:",todo);
});*/

/*Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log("ID NOT FOUND");
  }
  console.log("TODO BY ID:",todo);
}).catch((err) => console.log(err) );*/

var id = '5acb4e4b32d382474c0d6341';


Users.findById(id).then((user) => {
  if(!user){
    console.log("ID NOT FOUND");
  }
  console.log(JSON.stringify(user,undefined,2));
}, (err) => {
  console.log(err);
});
