let mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
    text: String
,   author: {

        // referencing owner User.
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

        // Colt: It wouldn't be very efficient if we had to look up the correct
        // author every time by taking an author ID then finding that author and
        // then finding its username. One simple way to avoid the look up is to
        // duplicate owner username here.
    ,   username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);