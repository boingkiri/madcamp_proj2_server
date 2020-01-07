var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var exports = module.exports = {};

var BoardSchema = new Schema({
    User_id : String,
    Building : String,
    Floor : String,
    Problem: String,
    Memo : String
});

module.exports = mongoose.model('board', BoardSchema);