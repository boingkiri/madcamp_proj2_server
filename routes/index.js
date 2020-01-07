// routes/index.js

const mongoose = require('mongoose');
const request = require('request');
var express = require('express');
var mongo = require('mongodb');
var app = express();

var bodyParser  = require('body-parser');
var assert = require('assert');

module.exports = function(app, Contacts)
{

    // db에서 데이터 가져오기
    app.get('/get-Contacts', function(req, res){
       
        Contacts.find(function(err, contacts){
            if(err) return res.status(500).send({error: 'database failure'});
            else{
                console.log("77777777777777" + contacts);
                res.json(contacts);
            }
        });
    });

    // db로 데이터 보내기
    app.post('/Contacts', async function(req, res){
        
        var inputData = req.body;
        console.log(req.body);

        //find로 전부 부른 후 비교하기
        var dbData;
        await Contacts.find(function(err, contacts){
            if(err) return res.status(500).send({error: 'database failure'});
            else{
                dbData = contacts;
            }
        });

        /// 중복되는 번호인 데이터가 있는지 검사 후 저장
        for(i = 0; i < inputData.length; i++){
            var contacts = new Contacts();
            var cnt = 0;
            for(j = 0; j < dbData.length; j++){
                if(inputData == null || inputData[i].phone === dbData[j].phone){
                    cnt = cnt + 1;
                }
            }
            console.log(cnt);
            if(cnt == 0){
                
                contacts.name = inputData[i].name;
                contacts.fb_id = inputData[i].fb_id;
                contacts.phone = inputData[i].phone;

                console.log("333333333333333" + inputData[i].name);
                contacts.save();
            }
            console.log("333333333333333" + contacts);
        } 

        res.end();      
    
    })
}



// if(data == 0){
            //     console.log("1111111111"+inputData[i].name);
            //     contacts.name = inputData[i].name;
            //     contacts.phone = inputData[i].phone;
            //     contacts.save(function (err){
            //         if(err) return console.log("Data Error :", err);
            //         res.render('my_first_ejs',data);
            //     });

            // }

// app.listen(80, ()=>{
//     console.log('listening on port 7080');
// });
// module.exports = function(app,contacts)
// {
//     app.post('/api/Contacts', function(req, res){
//         var contacts = mongoose.model('Contacts', Contacts);

//         contacts.name = req.body.name;
//         contacts.phone = req.body.phone;

//         console.log(req.body);
//         contacts.save(function(err){
//             if(err){
//                 console.error(err);
//                 res.json({result: 0});
//                 return;
//             }
//             res.json({result: 1});
//             console.log("Contacts successfully uploaded")
//         });
//     });
// }


// contacts.save(function(err){
        //     if(err){
        //         console.error(err);
        //         res.json({result: 0});
        //         return;
        //     }
        //     res.json({result: 1});
        //     console.log("Contacts successfully uploaded")
        // });







// var url = 'mongodb://localhost/yl';

// //Get homepage
// app.get('/', function(req, res, next){
//     res.render('index');
// })

// app.get('/get-data', function(req, res, next){
//     mongo.connect(url, function(err, db){
//         assert.equal(null, err);
//         var cursor = db.collection('contact').find();
//         cursor.array.forEach(function(doc, err) {
//             assert.equal(null, err);
//             resultArray.push(doc);
//         }, function(){
//             db.close();
//             res.render('index', {items: resultArray});
//         });
//     })
// })


// //Insert
// app.post('/insert', function(req, res, next){
//     var item = {
//         name: req.body.name,
//         phone: req.body.phone
//     };

//     mongo.connect(url, function(err, db){
//         assert.equal(null, err);
//         db.collection('contacts').insertOne(item, function(err, result){
//             assert.equal(null, error);
//             console.log('Item inserted');
//             db.close();
//         })
//     })
// })








// var router = express.Router();
// GET /contacts 요청 들어올 때 라우터, 
// 사용자 조회 요청 처리
// GET /contacts는 데이터를 json형식으로 반환

// router.get('/', function(req, res, next){
//     Contacts.find({}) // mongodb의 db.Contacts.find({})와 같음
//     .then((Contacts)=>{
//         res.json('mongoose', {Contacts});
//     })
//     .catch((err) =>{
//         console.error(err);
//         next(err);
//     });
// });
// module.exports = router
