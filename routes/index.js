// routes/index.js

const request   = require('request');
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var FormData    = require('form-data')
var http        = require('http');
var fs          = require('fs');
var admin       = require('firebase-admin');

var app_firebase = admin.initializeApp();


///
var Board = require('../models/Board');
var Building = require('../models/building');
var Admin = require('../models/admin');
var Problem = require('../models/problem');
var Token      = require('../models/token');


module.exports = function(app,Image,upload)
{
    app.get('/',function(req, res){
        console.log(req);
    });

    /* 업로드 요청 처리 */

    app.post("/upload", upload.array('image', 10), function(req, res){
    // console.log(req.file);

    // var title = req.body.title; // inputText의 name Value의 값을 가져옵니다.     
    
    for (var i = 0; i < req.files.length; i++){
        // var fileObj = req.files.myFile; // multer 모듈 덕분에​ req.files가 사용 가능합니다.  ​
        var fileObj = req.files[i];
        var orgFileName = fileObj.originalname; // 원본 파일명을 저장한다.(originalname은 fileObj의 속성)​​
        var saveFileName = fileObj.filename; // 저장된 파일명​
        var user_id = req.body.user_id;
        
        // console.log(title);
        console.log(orgFileName);
        console.log(saveFileName);
        console.log(user_id);

        // 추출한 데이터를 Object에 담는다.
        // var obj = { "title": title, "orgFileName": orgFileName, "saveFileName": saveFileName };
        var obj = {"orgFileName": orgFileName, "saveFileName": saveFileName, "user_id" : user_id };
        
        var newData = new Image(obj);         
        newData.save(function(err){ // DB에 저장한다.​
            if(err) res.send(err); // 에러 확인
            res.end("ok"); // 응답
        });
        }
    });


    /* Show all pictures to select */

    app.post("/download/entire", upload.array('image',10), function(req, res){
        // 요청시 해당 파일의 id값을 쿼리로 붙여서 전달합니다.(선택된 파일을 DB에서 찾기 위해)
        // var id = req.body.user_id;​
        var id = req.body.user_id;
        // var _id = __id.id;
        console.log("/download/entire");
        // console.log(req);
        console.log(id);

        var file_list = new Array();
        
        Image.find({"user_id":id}, (err, result) => {
            if (err) {
              throw err;
            }
            // res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName));
            // res.setHeader("Content-Type","binary/octet-stream");  

            for (var i = 0; i < result.length; i++){
                console.log(result[i]);
                console.log("ok");
                var filePath = __dirname + "/../../upload/" + result[i].saveFileName; // 다운로드할 파일의 경로​      
                var fileName = result[i].orgFileName; // 원본파일명​
                
                // 응답 헤더에 파일의 이름과 mime Type을 명시한다.(한글&특수문자,공백 처리)
                var file_object = new Object();
                file_object.filename = result[i].saveFileName;
                file_list.push(file_object);
            }
            var jsonData = JSON.stringify(file_list);
            console.log(jsonData);
            res.send(jsonData);

          });
        });
    
    app.get('/download/show', function(req,res){
        const imgUrl = "../upload/"
        var filename = req.query.filename;
        console.log(filename);
        result = imgUrl + filename;
        fs.readFile(result,function(err, data){
            res.writeHead(200, {"Context-Type":"image/jpg"});
            res.write(data);
            res.end();
        });
        // res.send(result);
    });
    
    app.post('/download/elem', function(req,res){
        const imgUrl = "http://192.249.19.254:7280/upload/"
        var filename = req.body.filename;
        console.log(filename);
        result = imgUrl + filename;
        res.send(result);
    });


    app.get('/toilet/board',function(req, res){
        var user_id = req.body.user_id;
        var building = req.body.building;
        var floor = req.body.floor;
        var problem = req.body.problem;
        var memo = req.body.memo;

        // var obj = {"User_id" : user_id, "Building" : building , "Floor" : floor,
        //             "Problem" : problem, "Memo" : memo};
        Board.find({}, (err, result) => {
            if (err) {
              throw err;
            }
            // res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName));
            // res.setHeader("Content-Type","binary/octet-stream");  

            var file_list = new Array();
            for (var i = 0; i < result.length; i++){
                console.log(result[i]);
                console.log("ok");

                file_list.push(result[i]);
            }
            var jsonData = JSON.stringify(file_list);
            console.log(jsonData);
            res.send(jsonData);
          });
    });

    app.post('/toilet/board',function(req, res){
        var user_id = req.body.user_id;
        var building = req.body.building;
        var floor = req.body.floor;
        var problem = req.body.problem;
        var memo = req.body.memo;
        console.log("Post board");

        var obj = {"Building" : building , "Floor" : floor, "Problem" : problem};
        var newData = new Board(obj);
        newData.save(function(err){
            if (err) res.send(err);
            res.send("ok");
        });

    });


    app.delete('/toilet/board',function(req, res){
        var user_id = req.body.user_id;
        var building = req.body.building;
        var floor = req.body.floor;
        var problem = req.body.problem;
        var memo = req.body.memo;
        console.log("delete getin");
        console.log(req.body);
        console.log(building);
        console.log(floor);
        console.log(problem);

        var obj = {"Building" : building , "Floor" : floor, "Problem" : problem};
        if (building == null || floor == null || problem == null){
            res.send('no body');
            return;
        }
        Board.deleteOne(obj, function(err, data){
            if (err) {
                res.send(err);
                console.log("Delete fail");
            }
            else{
                // Board.(data, function(err,))
                res.send('ok');
                console.log("Delete Success");
            }
        });
        // res.send('not good');
        

    });

    

    app.post('/toilet/isadmin',function(req, res){
        var id = req.body.id;


    });

    app.post('/toilet/emergency',function(req,res){
        var user_id = req.body.user_id;
        var building = req.body.building;
        var floor = req.body.floor;
        var problem = req.body.problem;
        var memo = req.body.memo;
        
        var obj = {"Building" : building , "Floor" : floor, "Problem" : problem};
        
        var newData = new Board(obj);
        newData.save(function(err){
            if (err) console.log(err);
        });

        Token.find({},function(err,data){
            if (err) {
                console.log(err);
                res.send(err);
            }

            console.log(data);
            var token_list = new Array();
            for (var i = 0; i < data.length; i++){
                token_list.push(data[i].Token);
            }

            var message = {
                notification: {
                    title:problem,
                    body:building + " " + floor
                },
                data: {
                    title:problem,
                    body:building + " " + floor
                },
                tokens : token_list
              };
            admin.messaging().sendMulticast(message)
              .then((response) => {
                console.log('Successfully sent message:', response);
                res.end();
              }).catch((error) => {
                console.log('Error sending message:', error);
                res.end();
              });
        });

        
    })

    app.get('/toilet/token',function(req,res){
        var token = req.query.token;
        var new_token = {"Token" : token};

        Token.findOne(new_token, function(err, data){
            if (err) res.send(err);
            // res.send('ok');

            // if (typeof data !== 'undefined' && data.length > 0){
            if (data != null){  
                console.log(data);
                console.log("already exist");
            }
            else{
                console.log("no exist");
                var newData = new Token(new_token);         
                newData.save(function(err){ // DB에 저장한다.​
                    if(err) res.send(err); // 에러 확인
                    res.end("ok"); // 응답
                });
            }
        })

    })


//   /* 삭제 요청 처리 */
//  app.get("/delete", function(req, res){
//     // 요청시 해당 파일의 id값을 쿼리로 붙여서 전달합니다.(선택된 파일을 DB에서 찾기 위해)
//     var _id = req.query.id;

//     // id를 사용해 데이터를 찾음
//     DBData.findOne({"_id":_id})
//     .select("saveFileName") // 저장된 이름을 가져옵니다.
//     .exec(function(err, data){ // 완료되면 찾은 데이터는 data에 담깁니다. ​     
//     var filePath = __dirname + "/../upload" + data.saveFileName; // 삭제할 파일의 위치​
//             fs.unlink(filePath, function(){ // fs 모듈을 이용해서 파일 삭제합니다.​

//                 // 삭제가 완료되면 여기가 실행됩니다.
//                 DBData.remove({"_id":_id}, function(err){ // MongoDB 에서 파일 정보 삭제하기​
//                 if(err) res.send(err); // 에러 확인
//                     res.end("ok"); // 응답
//                 });
//             });
//         });
//     }); 
}