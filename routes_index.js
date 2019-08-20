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

            if (err) return res.render("register");

            // establish logged in session
            passport.authenticate("local", { session: true })(req, res, () => {
                console.log("is authenticate" + req.isAuthenticated());
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
                    successRedirect: "/campgrounds"
                ,   failureRedirect: "/login"
                })
           );


// show logout form
router.get("/logout", (req, res) => {
   req.logout();
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

    res.redirect("back");

    // failure guard
    if (req.user.username !== "admin") return;

    require("./seeds")(req.body.password);

});

module.exports = router;