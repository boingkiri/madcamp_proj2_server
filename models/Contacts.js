import mongoose from 'mongoose';
const Schema = mongoose.Schema;
 
const contactSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});


// var contact = new Contact({
//     name : "AAAA",
//     phone : "bbbb",
//     email : "CCC"
// });

// contact.save(function(err, book){
//     if(err) return console.error(err);
//     console.dir(book);
// });

export default mongoose.model('contact', contactSchema);