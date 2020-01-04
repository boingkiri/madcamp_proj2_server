// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/yl', { useNewUrlParser: true, useUnifiedTopology: true });

// DEFINE MODEL
// var Book = require('./models/book');
var Book =  require('./models/book');

// [CONFIGURE SERVER PORT]
// var port = process.env.PORT || 8080;
var port = 80;

// [CONFIGURE ROUTER]
// console.log(app);
var router = require('./routes')(app,Book);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

