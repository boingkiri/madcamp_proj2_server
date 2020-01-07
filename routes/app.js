// 디비 연결

// [LOAD PACKAGES]
var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var app = express();

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

// DEFINE MODEL/Schema
var Contacts = require('../routes/schemas');

// [CONFIGURE SERVER PORT]
// var port = process.env.PORT || 7080;
var port = 80;

// [CONFIGURE ROUTER]
// console.log(app);
var router = require('../routes')(app,Contacts); // route를 열어줄 때 (app,Contacts)로 열어줌

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});


















// var indexRouter = require('../routes/index');
// var ContactsRouter = require('../routes/Contacts');
// var connect = require('../routes'); //routes 폴더에 연결

// var app = express();
// connect(); 

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// // CONNECT TO MONGODB SERVER
// var db = mongoose.connection;
// db.on('error', console.error);
// db.once('open', function(){
//     // CONNECTED TO MONGODB SERVER
//     console.log("Connected to mongod server");
// });

// mongoose.connect('mongodb://localhost/yl', { useNewUrlParser: true, useUnifiedTopology: true });


// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.static(path.join(__dirname,'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


// app.use('/', indexRouter);
// app.use('/Contacts', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
