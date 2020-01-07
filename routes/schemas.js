// 스키마 생성


var mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const contactSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    fb_id: {
        type: String
    }
});

module.exports = mongoose.model('Contacts', contactSchema); //model의 첫 번째 인자는 컬렉션 이름 

//스키마 만든 후에는 서버 실행부분에서 require 필수 ***
//require 시 스키마가 등록되어 db작업 시 스키마 맞춰서 검사

//model 메소드로 스키마 - 몽고디비 컬렉션 연결 모델 생성