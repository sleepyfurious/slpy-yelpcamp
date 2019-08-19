// === requires
let express         = require("express")
,   bodyParser      = require("body-parser")
,   session         = require("express-session")
,   passport        = require('passport')
,   LocalStrategy   = require('passport-local')
,   mongoose        = require("mongoose")
,   User            = require("./models_user")


// === constant
const DATABASEURL   = process.env.DATABASEURL;
const PORT          = process.env.PORT;


// === initialization
let app = express();
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

{ // passport configuration

    // Initializing express-session for express app must be done before passport
    // initialization below
    app.use(session({
        secret: "Once again Rusty wins cutest dog!"
    ,   resave: false
    ,   saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // configure passport to use a LocaalStrategy that use authentication code 
    // provided by Passport-Local Mongoose.
    passport.use(new LocalStrategy( User.authenticate() ));

    // use static serialize and deserialize from Passport-Local Mongoose User
    // in passport session.
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}

// register middleware for every routes, this must be done after
// app.use(passport.session()) in order to have passport's variables and methods
// supplied in req for us.
app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   next();
});

{ // database

    // work around mongoose's internal deprecation with global options, see
    // deprecations note of mongoose V5.6.9.
    mongoose.set('useNewUrlParser'  , true);
    mongoose.set('useFindAndModify' , false);
    mongoose.set('useCreateIndex'   , true);

    //
    mongoose.connect(DATABASEURL);
}


// === the rest

// routing
app.use("/", require("./routes_index"));
app.use("/campgrounds", require("./routes_campgrounds"));

// serve
app.listen(process.env.PORT, function(){
    console.log("YelpCamp has started!!")
});
