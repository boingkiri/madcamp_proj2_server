var mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const contactSchema = new Schema({
    name: String,
    phone: String,
    published_date: { type: Date, default: Date.now  }
});


const Contacts = mongoose.model('contacts', contactSchema);

module.exports = Contacts;