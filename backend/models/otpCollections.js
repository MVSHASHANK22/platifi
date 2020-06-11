
let mongoose = require('mongoose');

var otpCollectionsSchema = new mongoose.Schema({
  otpData :{
    name : String,
    email :String,
    otp : String
  }

});

module.exports = mongoose.model("otpCollections", otpCollectionsSchema);
