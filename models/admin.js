var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var exports = module.exports = {};

var adminSchema = new Schema({
    id: String
});

module.exports = mongoose.model('admin', adminSchema);