const MongoClient = require ("mongodb").MongoClient;

/*var user = {name:"vinoth",age:25};

var {name} = user;
console.log(name);*/

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db) => {
  if(err){
    console.log("Cannot able to connect with mongodb server");
  }
  console.log("connect with mongoDB server");

//findOneAndUpdate

/*db.collection("Todos").findOneAndUpdate({
  _id:new ObjectId('5acb2eb9a38b4c01dfb4da80')
},{
  $set: {
    complete: true
  }
},{
  returnOriginal: false
}).then((result) => {
  console.log(result);
});*/

db.collection("Todos").findOneAndUpdate({
_id: new ObjectID("5acb0a3729ce31329420037f")

},{
  $set:{
  name:"Surya"
},
$inc:
{
  age:3
}
},{
  returnOriginal:false
}).then((result) => {
  console.log(result);
});

//db.close();

});
