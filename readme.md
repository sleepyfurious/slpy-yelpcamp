# Slpy's YelpCamp
YelpCamp is a Node.js web application from The Web Developer Bootcamp[¹](#credits). A plain and simple social network website for my learning and demonstration. This project, Slpy's YelpCamp, is my version of YelpCamp. I started versioning it at revision 2 of YelpCamp (YelpCamp_v2). I'll code to achieve almost the same result as the final version in the course, v11, but with possibilities of some minor adjustments to my preference. The goal is to learn full-stack web development try some relevant coding skills.

See pending development here: [readme_devList.md](readme_devList.md).

## Deployment
The code use environment variables to supply site-specific configuration. Currently, supplying the following environment variable is required:
* DATABASEURL: The code use MongoDB to store data.
* PORT: listened PORT number for application to response via the web.

For example, to start the application on the server in Bash with registered port 3000 and MongoDB instance in localhost, you may started it with the following CLI script in the root directory of this project: 
```bash
export PORT=3000
export DATABASEURL="mongodb://localhost/yelp_camp"
node app.js
```

## Credits
[1] This project is a part of my enrollment in the Udemy course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp/).
