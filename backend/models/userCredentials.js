let mongoose = require('mongoose');
let passportLocalMongoose=require('passport-local-mongoose');

var userCredentialsSchema = new mongoose.Schema({
    username:String,
    password:String
});

userCredentialsSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("userCredentials", userCredentialsSchema);
