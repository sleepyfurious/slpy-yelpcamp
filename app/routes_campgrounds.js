let router      = require("express").Router()
,   Campground  = require("./models_campground")
,   middleware  = require("./routes_middleware");


// INDEX
router.get("/", (req, res) => {

    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if (err) console.log(err)
        else res.render("campgrounds", {campgrounds:allCampgrounds});

}); });


// NEW - show form to create new campground
router.get( "/new", middleware.isLoggedIn
          , (req, res) => res.render( "campgrounds_form"
                                    , {isNewOrNotEdit: true} ));


// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {

    // get data from form and add to campgrounds array
    let campground = Object.assign({}, req.body.campground);
    campground.author = {  id: req.user._id
                        ,  username: req.user.username  };

    // Create a new campground and save to DB
    Campground.create(campground, (err, dbCampground) => {
        if (err) console.log(err);
        else {
            console.log( "campground in DB created: " + dbCampground );
            res.redirect("/campgrounds");   // redirect back to campgrounds page
        }
}); });


// SHOW - shows more info about one campground
router.get("/:id", (req, res) => {

    // find the campground with provided ID
    // render show template with that campground
    Campground.findById(req.params.id).populate("comments")
                                      .exec((err, foundCampground) => {
        if ( err ) console.log(err)
        else {
            console.log(foundCampground);

            // render show template with that campground
            res.render("campgrounds_show", {campground:foundCampground});
        }
}); });


// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {

    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds_form", { campground: foundCampground
                                       , isNewOrNotEdit: false
                  });
}); });


// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {

    // find and update the correct campground
    Campground.findByIdAndUpdate( req.params.id, req.body.campground
                                , (err, updatedCampground) => {
       if (err) res.redirect("/campgrounds");
       else res.redirect("/campgrounds/" + req.params.id);

}); });


// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {

   Campground.findByIdAndRemove(req.params.id, (err) => {
      if (err)  res.redirect("/campgrounds");
      else      res.redirect("/campgrounds");

}); });


module.exports = router;