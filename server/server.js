var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {user} = require('./models/user.js');

const {ObjectID} = require("mongodb");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=> {
  //console.log(req.body);
  var todos = new Todo ({
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
    console.log("ID NOT FOUND");
  }

    Todo.findById(id).then((todo) => {
      if(!todo){
        console.log("ID NOT FOUND");
      }
      console.log("TODO",todo);

    }).catch((err) => {
      console.log(err);
    });

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
