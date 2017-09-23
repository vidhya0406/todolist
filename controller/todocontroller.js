var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to mongoose db
mongoose.connect('mongodb://test:test@ds149124.mlab.com:49124/todo');

// Create db schema
//Object with just one property
var todoSchema = new mongoose.Schema({
  item: String
});

// Create model
// Here Todo is the model/type name and it will be stored as a collection in mongoDB
// This model will be based on the above created schema
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function (app) {
 // This is place for request handlers

 //GET on the URL itself

 app.get('/todo', function(request, response){
   //get data from monogoDB and pass it to the view
   // Data we need is represented by the model we created.
   //GET all items in the collection = {}
   //GET specific item = {item: 'get app live'}
   //callback function with err and data
   Todo.find({}, function(err, data){
     if (err) throw err;
     response.render('todo', {todos: data});
   });
 });

 //POST
 app.post('/todo', urlencodedParser, function(request, response){
   // get data from the view and add it to monogoDB
   var newTodo = Todo(request.body).save(function(err,data){
     if (err) throw err;
     response.json(data);
   });
 });

 //DELETE
 app.delete('/todo/:item', function(request, response){
   // Delete the requested item from monogoDB
   Todo.find({item: request.params.item.replace(/\-/g, " ")}).remove(function(err, data){
     if (err) throw err;
     response.json(data);
   });
});
}
