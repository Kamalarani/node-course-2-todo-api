const {ObjectID} = require("mongodb");

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
  consle.log(result);
});

//findOneAndRemove
//findByIdAndRemove

Todo.findOneAndRemove({_id:'1'}).then((todo) => {
  console.log(todo);
})

Todo.findByIdAndRemove('1').then((todo) => {
  console.log(todo);
});
