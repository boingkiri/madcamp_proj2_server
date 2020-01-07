var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var exports = module.exports = {};

var buildingSchema = new Schema({
    // fieldname: String, 
    id : String,
    floor_range: [String, String]
    // published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('building', buildingSchema);