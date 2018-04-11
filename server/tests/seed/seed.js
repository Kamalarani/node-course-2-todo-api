const {ObjectID} = require("mongodb");
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: new IbjectID(),
  email: 'exam@example.com',
  paasword: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'},'Pass123').toString()
  }]
},{
  _id: userTwoId,
  email:'jen@gmail.com',
  password: 'userTwoPass'
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id:userTwoId,access:'auth'},'Pass123').toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: "First test case:"
  _creator: userOneId
},{
  _id: new ObjectID(),
  text: "Second test case:",
  completed: "true",
  competedAt: 12
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return promise.all([userOne,userTwo])
  }).then(() => done());
};

module.exports = {todos,populateTodos,users,populateUsers};
