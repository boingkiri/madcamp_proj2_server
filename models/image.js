var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var exports = module.exports = {};

var imageSchema = new Schema({
    // fieldname: String, 
    orgFileName: String, 
    saveFileName: String,
    user_id : String
    // published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('image', imageSchema);