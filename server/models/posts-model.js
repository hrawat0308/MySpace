const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
        title : { type : String, required : true },
        description : { type : String, required : true },
        content : { type : String,  },
        postDate : { type : String, required : true },
        user : { type: mongoose.Types.ObjectId, required : true, ref:'User' },
        author : { type : String, required : true },
});



module.exports = mongoose.model('Post', postSchema);