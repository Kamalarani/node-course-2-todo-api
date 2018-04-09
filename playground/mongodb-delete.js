const MongoClient = require ("mongodb").MongoClient;

/*var user = {name:"vinoth",age:25};

var {name} = user;
console.log(name);*/

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db) => {
  if(err){
    console.log("Cannot able to connect with mongodb server");
  }
  console.log("connect with mongoDB server");

  //deleteMany

  /*(db.collection("Todos").deleteMany({text:"Deleting the document"}).then((result)=>{
    console.log("The Documents Are Deleted Successfully "+result);
  });*/

//deleteOne

  /*db.collection("Todos").deleteOne({text:"Delete one document"}).then((result) => {
    console.log("One Record is Deleted Successfully "+result);
  });*/

  //findOneAndDelete

  /*db.collection("Todos").findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });*/

  db.collection("Users").findOneAndDelete({name:"malar"}).then((result) => {
    console.log("THE RECORD IS FIND AND GETS DELETED")
    console.log(result);
  });


//db.close();

});
