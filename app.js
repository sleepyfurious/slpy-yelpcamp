// === requires
let express         = require("express")
,   bodyParser      = require("body-parser")
,   mongoose        = require("mongoose")

// mongoose models
,   Campground  = require("./models_campground");

// === initialization
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

// work around mongoose's internal deprecation with global options, see
// deprecations note of mongoose V5.6.9.
mongoose.set('useNewUrlParser'  , true);
mongoose.set('useFindAndModify' , false);
mongoose.set('useCreateIndex'   , true);

// connect db
databaseURL = process.env.DATABASEURL; // specified through environment variable
mongoose.connect(databaseURL);

// === the rest

// routing
app.use("/", require("./routes_index"));
app.use("/campgrounds", require("./routes_campgrounds"));

// serve
app.listen(process.env.PORT, function(){
    console.log("YelpCamp has started!!")
});