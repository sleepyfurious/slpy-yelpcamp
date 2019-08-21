let router      = require("express").Router()
,   passport    = require("passport")
,   User        = require("./models_user")
,   middleware  = require("./routes_middleware");


// show landing page
router.get("/", (req, res) => res.render("landing") );


// show register form
router.get("/register", (req, res) => res.render("register") );


// handle sign up logic
router.post("/register", (req, res) => {

    // .register is passport-local-mongoose method
    User.register(

        // password is supplied separately from user's document initilizer
        // as passpo~l~m will hash for us.
        new User({username: req.body.username})
    ,   req.body.password

        // post-register handler
    ,   (err, user) => {

            if (err) {
                // - we're taking advantage of "err" for our message.
                // - req.flash must be done before redirect to have the info
                // available in req.flash for the redirection.
                req.flash("error", err.message);
                return res.redirect("/register");
            }

            req.flash("success", `${req.body.username} signed up.`);

            // establish logged in session
            passport.authenticate("local", { session: true })(req, res, () => {

                req.flash("success", "You're now logged in!");
                res.redirect("/campgrounds"); 
            });
        }
); });


// show login form
router.get("/login", (req, res) => res.render("login") );


// handling login request
router.post(    "/login"

                // passport.authenticate is actually a middleware
           ,    passport.authenticate("local", {
                    failureRedirect: "/login"
                ,   failureFlash    : true
                })
           ,    (req, res) => {
                    // If this function gets called, the authentication was 
                    // successful.
                    
                    req.flash( 
                        "success"
                    ,   `Logged you in. Welcome back ${req.body.username}`
                    );

                    res.redirect("/campgrounds");
                }
           );


// show logout form
router.get("/logout", (req, res) => {
   req.logout();

   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});


// profile page
router.get("/profile", middleware.isLoggedIn, (req, res) => {
    res.render("profile");
});


// reset database
// - this route is opened up just for username admin.
router.post(    "/resetdata"
           ,    middleware.isLoggedIn
           ,    (req, res) => {

    // failure guard
    if (req.user.username !== "admin") return;

    require("./seeds")(req.body.password);

    res.redirect("back");

});

module.exports = router;