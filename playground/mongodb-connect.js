const MongoClient = require ("mongodb").MongoClient;

var user = {name:"vinoth",age:25};

var {name} = user;
console.log(name);

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db) => {
  if(err){
    console.log("Cannot able to connect with mongodb server");
  }

  console.log("Connected to mongodb server");
/*  db.collection("Todos").insertOne({
    text: "Something to do",
    completed : false
  },(err,result) => {
    if(err){
      console.log("Unable to insert Todo",err);
    }

    console.log(JSON.stringify(result.ops,undefined,2));

  });*/

/*  db.collection("Users").insertOne({
    _id: 124,
    name: "kamalrani",
    age: 22,
    location: "Bangalore"
  },(err,result) => {
    if(err){
      console.log("unable to insert into Users",err);
    }

    console.log(result.ops[0]._id.getTimestamp());

  });*/

db.close();

});
