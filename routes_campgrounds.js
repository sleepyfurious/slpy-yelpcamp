let router      = require("express").Router()
,   Campground  = require("./models_campground");

router.get("/", (req, res) => {

    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err) {
            console.log(err)
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }

}); });

router.post("/", (req, res) => {

    // get data from form and add to campgrounds array
    let name = req.body.name
    ,   image = req.body.image
    ,   desc = req.body.description
    ,   newCampground = {name:name, image:image, description: desc};

    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");   // redirect back to campgrounds page
        }
}); });

router.get("/new", (req, res) => {
    res.render("campgrounds_new")
});

// SHOW - shows more info about one campground
router.get("/:id", (req, res) => {

    // find the campground with provided ID
    // render show template with that campground
    Campground.findById(req.params.id, (err, foundCampground) => {
        if ( err ) {
            console.log(err)
        } else {
            // render show template with that campground
            res.render("show", {campground:foundCampground});
        }
}); });

module.exports = router;