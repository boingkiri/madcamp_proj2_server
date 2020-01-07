var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var exports = module.exports = {};

var TokenSchema = new Schema({
    Token : String
});

module.exports = mongoose.model('token', TokenSchema);