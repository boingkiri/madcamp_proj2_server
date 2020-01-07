var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var exports = module.exports = {};

var problemSchema = new Schema({
    // fieldname: String, 
    Problem: String
    // published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('problem', problemSchema);