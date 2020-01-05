// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var multer      = require('multer');


var upload = multer({dest : '../upload/'});
// [CONFIGURE APP TO USE bodyParser]
// app.use(multer({dest:"../upload/"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/proj2', { useNewUrlParser: true, useUnifiedTopology: true });

// DEFINE MODEL
// var Book = require('./models/book');
var Image =  require('./models/image');

// [CONFIGURE SERVER PORT]
// var port = process.env.PORT || 8080;
var port = 80;

// [CONFIGURE ROUTER]
// console.log(app);
var router = require('./routes')(app,Image,upload);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

