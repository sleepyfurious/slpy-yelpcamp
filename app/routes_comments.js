let router      = require("express").Router({mergeParams: true})
,   Campground  = require("./models_campground")
,   Comment     = require("./models_comment")
,   middleware  = require("./routes_middleware");


// NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {

    // find campground by id
    console.log("campground id: " + req.params.id);
    Campground.findById(req.params.id, (err, campground) => {
        if (err)    console.log(err);
        else        res.render("comments_form", {  campground: campground
                                                ,  isNewOrNotEdit: true  });

})  });


// CREATE
router.post("/", middleware.isLoggedIn, (req, res) => {

   // lookup campground using id
   Campground.findById(req.params.id, (err, campground) => {

        if (err) {
            console.log(err);
            res.redirect("/campgrounds");

        } else {

            Comment.create(req.body.comment, (err, comment) => {
           
                if (err) {
                    req.flash("error", "Something went wrong.");    
                    console.log(err);

                } else {

                    //add username and id to comment
                    comment.author.id        = req.user._id;
                    comment.author.username  = req.user.username;

                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);

                    req.flash("success", "Successfully added comment.");
                    res.redirect('/campgrounds/' + campground._id);
                }

            });
        }

}); });


// EDIT
router.get( "/:comment_id/edit"
          , middleware.checkCommentOwnership
          , (req, res) => 
{
    Campground.findById(req.params.id, (err, foundCampground) => {

        if (err || !foundCampground) {
            req.flash("error", "No campground found.");
            return res.redirect("back");
        }

        Comment.findById(req.params.comment_id, (err, foundComment) => {

            if (err) res.redirect("back");
            else     res.render("comments_form", {  campground: {
                                                        _id : req.params.id
                                                    ,   name: foundCampground.name
                                                    }     
                                                 ,  comment: foundComment
                                                 ,  isNewOrNotEdit: false
                               });
        }); 
}); });


// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {

   Comment.findByIdAndUpdate( req.params.comment_id
                            , req.body.comment
                            , (err, updatedComment) => {

      if (err)  res.redirect("back");
      else      res.redirect("/campgrounds/" + req.params.id );

}); });


// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {

    Comment.findByIdAndRemove(req.params.comment_id, (err) => {

        if (err) res.redirect("back");
        else {
            req.flash("success", "Comment deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
}); });

module.exports = router;