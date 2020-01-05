// routes/index.js

const request = require('request');
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

module.exports = function(app,Image,upload)
{
    app.get('/',function(req, res){
        console.log(req);
    });

    // // GET ALL BOOKS
    // app.get('/api/books', function(req,res){
    //     Book.find(function(err, books){
    //         if(err) return res.status(500).send({error: 'database failure'});
    //         res.json(books);
    //     })
    // });

    // // GET SINGLE BOOK
    // app.get('/api/books/:book_id', function(req, res){
    //     res.end();
    // });

    // // GET BOOK BY AUTHOR
    // app.get('/api/books/author/:author', function(req, res){
    //     res.end();
    // });

    // // CREATE BOOK
    // app.post('/api/books', function(req, res){
    //     var book = new Book();        
        
    //     book.name = req.body.name;
    //     book.author = req.body.author;
    //     console.log(req.body);
    //     // book.published_date = new Date(req.body.published_date);
    //     book.save(function(err){
    //         if(err){
    //             console.error(err);
    //             res.json({result: 0});
    //             return;
    //         }
    //         res.json({result: 1});
    //         console.log("Data successfully uploaded");
    //     });
    // });

    // // UPDATE THE BOOK
    // app.put('/api/books/:book_id', function(req, res){
    //     res.end();
    // });

    // // DELETE BOOK
    // app.delete('/api/books/:book_id', function(req, res){
    //     res.end();
    // });

    /* 업로드 요청 처리 */

 app.post("/upload", upload.array('image',10), function(req, res){
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
    var obj = {"orgFileName": orgFileName, "saveFileName": saveFileName, "user_id":user_id };
    // DBData 객체에 담는다. (DBData는 moongoose의 schema를 모델화한 객체입니다.)​
    var newData = new Image(obj);         
    newData.save(function(err){ // DB에 저장한다.​
        if(err) res.send(err); // 에러 확인
        res.end("ok"); // 응답
     }); 
    }
    
    });


    /* Show all pictures to select */

// app.get("/download/entire", function(req, res){
//         // 요청시 해당 파일의 id값을 쿼리로 붙여서 전달합니다.(선택된 파일을 DB에서 찾기 위해)
//         var _id = req.body.id;​
//         // var _id = __id.id;

//         // id를 사용해 데이터를 찾음
//         DBData.findOne({"_id":_id})
//         .select("orgFileName saveFileName") // 해당파일의 원래이름과 저장된 이름을 가져옴
//         .exec(function(err, data){ // 완료되면 찾은 데이터는 data에 담깁니다.      
//         var filePath = __dirname + "/../upload/" + data.saveFileName; // 다운로드할 파일의 경로​      
//         var fileName = data.orgFileName; // 원본파일명​

//         // 응답 헤더에 파일의 이름과 mime Type을 명시한다.(한글&특수문자,공백 처리)
//         res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName));
//         res.setHeader("Content-Type","binary/octet-stream");  

//         // filePath에 있는 파일 스트림 객체를 얻어온다.(바이트 알갱이를 읽어옵니다.)
//         var fileStream = fs.createReadStream(filePath);

//         // 다운로드 한다.(res 객체에 바이트알갱이를 전송한다)
//         fileStream.pipe(res);  
//     });
//   });

    /* 다운로드 요청 처리 */

//  app.get("/download", function(req, res){
//         // 요청시 해당 파일의 id값을 쿼리로 붙여서 전달합니다.(선택된 파일을 DB에서 찾기 위해)
//         var _id = req.query.id;​

//         // id를 사용해 데이터를 찾음
//         DBData.findOne({"_id":_id})
//         .select("orgFileName saveFileName") // 해당파일의 원래이름과 저장된 이름을 가져옴
//         .exec(function(err, data){ // 완료되면 찾은 데이터는 data에 담깁니다.      
//         var filePath = __dirname + "/../upload/" + data.saveFileName; // 다운로드할 파일의 경로​      
//         var fileName = data.orgFileName; // 원본파일명​

//         // 응답 헤더에 파일의 이름과 mime Type을 명시한다.(한글&특수문자,공백 처리)
//         res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName));
//         res.setHeader("Content-Type","binary/octet-stream");  

//         // filePath에 있는 파일 스트림 객체를 얻어온다.(바이트 알갱이를 읽어옵니다.)
//         var fileStream = fs.createReadStream(filePath);

//         // 다운로드 한다.(res 객체에 바이트알갱이를 전송한다)
//         fileStream.pipe(res);  
//     });
//   });

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