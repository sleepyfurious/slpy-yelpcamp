// === requires
let express         = require("express")
,   bodyParser      = require("body-parser")
,   methodOverride  = require("method-override")
,   session         = require("express-session")
,   passport        = require('passport')
,   LocalStrategy   = require('passport-local')
,   mongoose        = require("mongoose")
,   flash           = require('connect-flash')
,   User            = require("./app/models_user");


// === constant
const DATABASEURL   = process.env.DATABASEURL;
const PORT          = process.env.PORT;


// ===
let app = express();
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

// It is important that this module is used before any module that needs to
// know the method of the request
app.use(methodOverride("_method"));

// Using express-session() must be done before using passport.sesion() below to
// ensure that login session is restored in the correct order.
app.use(session({
    secret: "Once again Rusty wins cutest dog!"
,   resave: false
,   saveUninitialized: false
}));

app.use(flash());

{ // passport configuration

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
   res.locals.flash_error   = req.flash("error");
   res.locals.flash_success = req.flash("success");

   next();
});

{ // database

    // work around mongoose's internal deprecation with global options, see
    // deprecations note of mongoose V5.6.9.
    mongoose.set('useNewUrlParser'  , true);
    mongoose.set('useFindAndModify' , false);
    mongoose.set('useCreateIndex'   , true);

    mongoose.connect(DATABASEURL);
}

// routing
app.use("/", require("./app/routes_index"));
app.use("/campgrounds", require("./app/routes_campgrounds"));
app.use("/campgrounds/:id/comments", require("./app/routes_comments"));

// serve
app.listen(process.env.PORT, function(){
    console.log("YelpCamp has started!!")
});
