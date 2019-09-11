# 20190815 About this file
This file notes a list of development items from Colt's YelpCamp V1 to his final V11 and beyond. As watched his course video, I also made notes with my comments and fixes those were covered by his TA, Ian. The items' progress is marked with checkboxes. I'll code to achieve the result as same as his V11 version, but with possibilities of some minor adjustments that I believe to give better, cleaner code that I might do easily. After finish the work and remove all "wip", there is the "aftermath" part that I might come back to take a look and add some additional feature later.

# YelpCamp V1

## YelpCamp

- [x] Add Landing Page.
- [x] Add Campgrounds Page that lists all campgrounds.

Each Campground has:
* Name
* Image

## Layout and Basic Styling
- [x] Create our header and footer partials.
- [x] Add in Bootstrap.

## Creating New Campgrounds
- [x] Setup new campground POST route.
- [x] Add in body-parser.
- [x] Setup route to show form.
- [x] Add basic unstyled form.

## Style the campgrounds page
- [x] Add a better header/title.
- [x] Make campground display in a grid.

## Style the Navbar and Form
- [x] Add a navbar to all templates.
- [x] Style the new campground form.

# YelpCamp V2

## Add Mongoose
- [x] Install and configure Mongoose.
- [x] Setup campground model (Mongoose's Item Model).
- [x] Use campground model inside of our routes.

## Add Show Page
"A page describe more info about campground item"
- [x] Review the RESTful routes we've seen so far.
- [x] Add description to our campground model.
- [x] Add a "show" route/template.

# YelpCamp V3

## Add Seeds File
- [x] Add a seeds.js. A functionality to clear and populate our database with some sample data
- [x] Run the seeds file

## Add the Comment model!
- [x] Add the comment model!
- [x] Display comments on campground show page

# YelpCamp V4

## New/Create routes for Comment
- [x] Add the comment's new and create routes
- [x] Add the new comment form

* reminder: I am not sure if we do RESTful routing here.. at least we don't have edit routes.

# YelpCamp V5

## Style Show Page
- [ ] Add sidebar to show page
- [x] Display comments nicely

# YelpCamp V6

## Auth Pt.1 - Add User Model
- [x] Install all packages needed for authentication
- [x] Define User model

## Auth Pt.2 - Register
- [x] Configure Passport
- [x] Add register routes
- [x] Add register view template

## Auth Pt.3 - Login
- [x] Add login routes
- [x] Add login template

- [x] get rid of the empty function in the login logic.

## Auth Pt.4 - Logout/Navbar
- [x] Add logout route
- [x] Prevent user from adding a comment if not signed in
- [x] Make links in navbar link correctly

## Auth Pt.5 - Show/Hide Links
- [x] Show/hide auth links correctly

# YelpCamp V7
"Substantial changes to the application structure."

## Refactor The Routes
- [x] Use Express router to reorganize all routes

# YelpCamp V8

## Users + Comments
- [x] Associate users and comments
- [x] Save author's name to a comment automatically

* reminder: We can count on there being a request out user because the only way we get here to this code is if the user is locked in. And that's because we have the isLoggedIn Middleware up there.

# YelpCamp V9

## Users + Campgrounds
- [x] Prevent an unauthenticated user from creating a campground
- [x] Save username+id to newly created campground

# YelpCamp V10

## Editing Campgrounds
- [x] Add Method-Override
- [x] Add Edit Route for Campgrounds
- [x] Add Link to Edit Page
- [x] Add Update Route

## Deleting Campgrounds
- [x] Add Destroy Route
- [x] Add Delete button

* reminder: if you want the delete route for campgrounds to also delete any associated comments.. the code still don't do it. Ian have the solution here: https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/6168552

## Authorization Part 1: Campgrounds
- [x] User can only edit his/her campgrounds
- [x] User can only delete his/her campgrounds
- [x] Hide/Show edit and delete buttons

* reminder: we can't just use === of course because one is mongoose's object and the other is a string. But, why not just use type coercioned equal operator when comparing foundCampground.author.id and req.user.\_id. why use foundCampground.author.id.equals(req.user.\_id)

## Editing Comments
- [x] Add Edit route for comments
- [x] Add Edit button
- [x] Add Update route

## Deleting Comments
- [x] Add Destroy route
- [x] Add Delete button

## Authorization Part 2: Comments
- [x] User can only edit his/her comments
- [x] User can only delete his/her comments
- [x] Hide/Show edit and delete buttons
- [x] Refactor Middlewares into their separate file

# YelpCamp V11
"Usability"

## Adding in Flash!
- [x] flash messages: see once
* reminder: Bootstrap has alert component with different colors built in!

## Landing Page
- [x] see tutorial here: https://github.com/nax3t/background-slider. follow it!
 * modernizr.js is to make old browser likes internet explorer <= 8.0 behave with css more like modern browser.
 * separate landing.css that is used just for this page
 * css property "animation" is going to allow us to actually fade images in and out. infinite value is to loop infinitly.

## The rest
- [ ] Dynamic Price Feature
- [x] Bootstraping the remaining and some CSS work.

## Aftermath
* I might later add features like google map and fuzzy search: https://www.udemy.com/the-web-developer-bootcamp/learn/lecture/6754188#content

### Make it use Bootstrap 4

- [x] Navbar
- [x] Flashes
- [x] Jumbotron
- [x] Cards
- [x] Dialogs
- [ ] Showpage