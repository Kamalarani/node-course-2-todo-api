const MongoClient = require ("mongodb").MongoClient;

/*var user = {name:"vinoth",age:25};

var {name} = user;
console.log(name);*/

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db) => {
  if(err){
    console.log("Cannot able to connect with mongodb server");
  }

  console.log("Connected to mongodb server");

  db.collection("Users").find({name: "malar"}).toArray().then((docs)=>{
    console.log("users");
    console.log(JSON.stringify(docs,undefined,2));
  },(err) => {
    console.log("Unable to Fetch the data",err);
  });

db.collection("Users").find({name: "malar"} ).count().then((count)=>{
  console.log(`Users db Count : ${count}`);

//  console.log(JSON.stringify(docs,undefined,2));
},(err) => {
  console.log("unable to fetch the data",err);
});
//db.close();

});
