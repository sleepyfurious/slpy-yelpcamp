let mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {   type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },

        // Colt: It wouldn't be very efficient if we had to look up the correct
        // author every time by taking an author ID then finding that author and
        // then finding its username. One simple way to avoid the look up is to
        // duplicate owner username here.
        username: String,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
});

module.exports = mongoose.model("Campground", campgroundSchema);