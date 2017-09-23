var express = require('express');
var todoController = require('./controller/todocontroller');

// Setup express app
var app = express();

//setup template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./assets'));

//fire controlllers
todoController(app);

//listen to a port
app.listen('3000');
console.log('Listening on port 3000...');
