let router      = require("express").Router()
,   passport    = require("passport")
,   User        = require("./models_user");

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
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

module.exports = router;