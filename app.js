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

// connect db
databaseURL = process.env.DATABASEURL; // specified through environment variable
mongoose.connect( databaseURL, { useNewUrlParser: true });

// === the rest

// routing
app.use("/", require("./routes_index"));
app.use("/campgrounds", require("./routes_campgrounds"));

// serve
app.listen(process.env.PORT, function(){
    console.log("YelpCamp has started!!")
});