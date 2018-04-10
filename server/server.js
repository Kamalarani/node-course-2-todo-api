var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require('./db/mongoose.js');
var{Todo} = require('./models/todo.js');
var{user} = require('./models/user.js');

var app = express();

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
  app.find().then((todos) => {
    res.send(todos);
  },(err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log("Started on port 3000");
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
