# Slpy's YelpCamp
YelpCamp is a Node.js web application from _The Web Developer Bootcamp_[¹](#credits). A plain and simple crowd-sourced camp review website. This project, Slpy's YelpCamp, is my version of YelpCamp, a code-along mainly for practicing and learning purposes. I started versioning it here at revision 2 of the original YelpCamp (YelpCamp_v2). I'll code to achieve almost the same result as the final version in the course, v11, but with possibilities of some minor adjustments to my preference. The goal is to learn full-stack web development try some relevant coding skills. See pending development note here: [readme__dev_list.md](readme__dev_list.md).

Slpy's YelpCamp has deviated from the original YelpCamp with the following additions:
* The use of some modern JavaScript element that pops out as I study _The JavaScript language_ book[²](#credits) along coding this app; there are elements like template literals, arrow functions, Object.assign, async/await, etc...
* The new and edit forms are DRY up in single EJS template instead of two separated one for both campgrounds and comments.
* A convenient UI for a user registered with name "admin" to seed database. The seeding also reset users to contain only "admin".

For reference, the original YelpCamp from _The Web Developer Bootcamp_ can be found here: https://github.com/nax3t/webdevbootcamp/tree/master/YelpCamp.


## Launching the app in local machine
The code use environment variables to supply site-specific configuration. Currently, supplying the following environment variable is required:
* DATABASEURL: The app use MongoDB to store data. This specifies URL to an instance of database.
* PORT: A port number for application to respond via the web.

For example, to start the application on the server in Bash with registered port 3000 and MongoDB instance on localhost, you may start it with the following CLI script in the root directory of this project: 
```bash
export PORT=3000
export DATABASEURL="mongodb://localhost/yelp_camp"
node app.js
```

This creates a quick and dirty Bash script that launches it all (both mongod and our node app) easily:
```bash
echo "\
\
# Prepare and launch an instance of MongoDB in background, then config and 
# launch the app.

# MongoDB
proc_stat=\`ps -A\`
if ! ( echo \"\$proc_stat\" | grep mongod ); then
  mkdir -p local_data
  mongod -dbpath=local_data --nojournal&
fi

# the app
export PORT=3000
export DATABASEURL=\"mongodb://localhost/yelp_camp\"
node app.js
\
" > ./local_serve && chmod +x local_serve

# now you may serve the app locally with ./local_serve
```

The site will now served locally at http://localhost:3000/

## Credits

1. This project is a part of my enrollment in the Udemy course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp/).

2. Ilya Kantor. 2019. _The JavaScript language_. Retrieved Aug, 2019 from https://javascript.info.

