require('./config/config.js');

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js')

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',(req,res)=> {
  //console.log(req.body);
  var todo = new Todo ({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(err) => {
    res.status(400).send(err);
  });
});

app.get('/todos',(req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  },(err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id',(req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

    Todo.findById(id).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});

    }).catch((err) => {
      res.status(400).send();
    });
    });

    app.delete('/todos/:id', (req ,res) => {
      var id = req.params.id;

      if(!ObjectID.isValid(id)){
        return res.status(404).send();
      }

      Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
          return res.status(404).send();
        }

        res.send({todo});
      }).catch((e) => {
        res.status(400).send();
      });
    });

    app.patch("/todos/:id",(req,res) => {
      var id = req.params.id;
      var body = _.pick(req.body,['text','completed']);

      if(!ObjectID.isValid(id)){
        return res.status(404).send();
      }

      if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
      }else{
        body.completed = false;
        body.completedAt = null;
      }

      Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
        if(!todo) {
          return res.status(404).send();
        }
        res.send({todo});
      }).catch((e) => {
        res.status(400).send();
      })
    });

    app.post('/users',(req,res) => {
      var body = _.pick(req.body,['email','password']);
      var user = new User(body);



      user.save().then(()=>{
        return user,generateAuthToken();
      }).then((token) => {
        res.header('x-auth',token).send(user);
      }).catch((err)=>{
        res.status(400).send(err);
      })
    });

    app.get('/users/me',authenticate,(req,res) => {
      res.send(req.user);
    });

app.listen(port, () => {
  console.log(`Started On The Port ${port}`);
});

module.exports = {app};

/*var newTodo = new Todo({
  text:"The New todo database"
});

newTodo.save().then((docs) => {
  console.log(docs);
},(err) => {
  console.log("Unable To Create New todo db");
});*/

/*var othertodo = new Todo({
  text: true
});

othertodo.save().then((docs)=> {
  console.log(docs);
},(err) => {
  console.log("Cannot able to ceate own todo database"+err);
});*/
