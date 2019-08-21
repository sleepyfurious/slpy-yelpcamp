// This code clear Camground a and pre-populate YelpCamp with some mock-up data.

const mongoose    = require("mongoose")
,     User        = require("./models_user")
,     Campground  = require("./models_campground")
,     Comment     = require("./models_comment");


const campgroundSeeds = [
    {   name        : "Canyon Floor"
    ,   image       : "https://source.unsplash.com/K9olx8OF36A"
    ,   description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
,   {   name        : "Perry's Lookdown"
    ,   image       : "https://source.unsplash.com/1azAjl8FTnU"
    ,   description : "It was a cold winter’s night in Australia’s Blue Mountains region of New South Wales and we were told there was a meteor shower for the ages inbound. Set this shot up and while i’m not convinced the meteor shower was real, was more than happy to settle for a shooting star and a dwarf galaxy."
    }
,   {   name        : "Cloud's Rest"
    ,   image       : "https://source.unsplash.com/aG5YyxZUCJg"
    ,   description : "Foggy Morning. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
,   {   name        : "Desert Mesa"
    ,   image       : "https://source.unsplash.com/FQ8PwEtQpqY"
    ,   description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
,   {   name        : "Moorland in Taizé"
    ,   image       : "https://source.unsplash.com/XJuhZqEE4Go"
    ,   description : "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
,   {   name        : "Cold in Denali"
    ,   image       : "https://source.unsplash.com/57EhJPlGyxE"
    ,   description : "Vestibulum tempor mauris dolor, id sodales magna scelerisque ac. Integer fermentum dolor elementum leo pretium ultrices. In varius interdum ipsum, eu accumsan elit laoreet vestibulum. Etiam congue, erat eget blandit luctus, nisi massa lobortis dui, et ultricies augue leo vitae ante. Curabitur dapibus consectetur convallis. Praesent dapibus sed dui quis hendrerit. Fusce ultricies aliquet risus. Integer efficitur, nisl vitae posuere blandit, purus nulla tincidunt ante, vel viverra lacus velit nec tellus. Donec metus lectus, sollicitudin at ante sit amet, euismod auctor tellus. Pellentesque ut tellus eu ligula cursus ullamcorper eget vitae enim."
    }
,   {   name        : "Defender Festival"
    ,   image       : "https://source.unsplash.com/DG-L9xZP-Lw"
    ,   description : "Nullam nec congue ex. Mauris et velit nisl. Cras magna sem, placerat nec ex tempor, vestibulum congue nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent vitae fermentum risus. Ut sed luctus diam. Vivamus suscipit vehicula sem, nec dignissim purus tristique at. Donec quis nisi pulvinar, cursus tortor eu, pellentesque elit. Sed sed ultrices dolor. Aenean ac metus sed quam placerat congue. Maecenas ac vehicula elit, eget pharetra mi. Suspendisse venenatis odio id neque sodales porttitor. Vestibulum ac risus ut nulla pellentesque dapibus. Proin pharetra volutpat felis non bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent et aliquet augue, et dapibus diam."
    }
,   {   name        : "Tee Pee"
    ,   image       : "https://source.unsplash.com/zv2tXjbDqg8"
    ,   description : "Curabitur in tempus massa, eu ornare erat. Vestibulum rutrum pretium sollicitudin. Donec lobortis vel est sed convallis. Sed in dui ipsum. Duis facilisis leo id erat lacinia lacinia. Suspendisse leo lorem, iaculis sed felis id, imperdiet venenatis arcu. Duis vitae volutpat felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
,   {   name        : "Morey's Piers & Beachfront"
    ,   image       : "https://source.unsplash.com/YU2km4sMh5I"
    ,   description : "Nam consectetur urna ac dolor pharetra feugiat. Praesent pulvinar ipsum sapien, non euismod mi volutpat quis. Suspendisse posuere molestie suscipit. Praesent id magna tempor, lacinia eros nec, consequat purus. Maecenas nec sapien vitae purus blandit porttitor quis eget turpis. Proin porttitor elit quis lorem pellentesque volutpat. Praesent mollis gravida libero, a dictum ante volutpat eget. Nunc malesuada enim id ex scelerisque, vel imperdiet libero eleifend. Fusce non consectetur est, sit amet fermentum metus. Etiam feugiat nisi nec lacinia elementum. Aenean ut eleifend dolor."
    }
]
// ^ These photos are from unsplash.com.

const usernameSeeds = [ "admin", "Homer Happy", "Ervin Howell" ];


// reset YelpCamp data and admin with new password.
module.exports = (adminPassword) => {

    // I've not decided about async/await in client code, so I wrap it here.
    (async () => {

        await User.remove({});
        await Campground.remove({});

        let nonAdminUserList = [];

        // Populate users
        // FYI: forEach doesn't support async/wait
        for (const [i, username] of usernameSeeds.entries()) {

            let newUser = await User.register( {username}
                                             , String(adminPassword)
                                             );
            if ( i > 0 ) nonAdminUserList.push(newUser);
        };

        let randomPostUserIndices 
            = generatePseudoRandomNumbers( 102, campgroundSeeds.length
                                         , nonAdminUserList.length )
        ,   randomCommentUserIndices
            = generatePseudoRandomNumbers( 103, campgroundSeeds.length
                                         , nonAdminUserList.length )

        // Populate campgrounds
        for (const [i, seed] of campgroundSeeds.entries()) {      

            const randomPostUser    
                  = nonAdminUserList[randomPostUserIndices[i]]

            ,     randomCommentUser 
                  = nonAdminUserList[randomCommentUserIndices[i]];

            const seedWithAuthor = Object.assign({}, seed);
            
            seedWithAuthor.author = { id       : randomPostUser._id 
                                    , username : randomPostUser.username };

            let campground = await Campground.create(seedWithAuthor);
            console.log("added a campground.");

            let comment = await Comment.create({  
                text  : "This place is great!"
            ,   author: { id: randomCommentUser._id 
                        , username: randomCommentUser.username
            }});

            campground.comments.push(comment);
            await campground.save();
            console.log("added new comment.");
        };

    })().catch(err => console.log(err));
}    

// The mathematic ref: https://gist.github.com/blixt/f17b47c62508be59987b
// return a list of number between 0 and range-1;
function generatePseudoRandomNumbers(seed, arraySize, range) {
    ret = [];

    for (let i = 0; i < arraySize; ++i) {
        seed = seed * 16807 % 2147483647;
        ret.push(seed %range);
    }
    
    return ret;
}