var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

var bookSchema = new Schema({
    title: String,
    author: String,
    etc:String
    // published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('book', bookSchema);