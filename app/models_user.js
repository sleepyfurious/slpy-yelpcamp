let mongoose                = require("mongoose")
,   passportLocalMongoose   = require("passport-local-mongoose");

// Passport-Local Mongoose will add a username, hash and salt field to store the
// username, the hashed password and the salt value.
let userSchema = new mongoose.Schema({});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
