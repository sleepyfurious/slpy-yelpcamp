// anything introduced in this v2 code will have // V2 { == code -- }

// V2 { ========================================================================
// formatting of concatinated variables can also be done like this.
var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
// --------------------------------------------------------------------------- }

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

// V2 { ========================================================================

// connect db
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

// setup schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// --------------------------------------------------------------------------- }

app.get("/", function( req, res ){
    res.render("landing");
});

app.get("/campgrounds", function( req, res ){
    // V2 { ====================================================================

    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err)
        } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });

    // ----------------------------------------------------------------------- }
});

app.post("/campgrounds", function( req, res ){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description: desc};

    // V2 { ====================================================================

    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");   // redirect back to campgrounds page
        }
    });

    // ----------------------------------------------------------------------- }
});

app.get("/campgrounds/new", function( req,res ){
    res.render("new")
});

// V2 { ========================================================================

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function( req,res ){
    // find the campground with provided ID
    // render show template with that campground
    Campground.findById( req.params.id , function(err, foundCampground){
        if ( err ) {
            console.log(err)
        } else {
            // render show template with that campground
            res.render("show", {campground:foundCampground});
        }
    });
});

// --------------------------------------------------------------------------- }

app.listen(3000, function(){
    console.log("YelpCamp has started!!")
});