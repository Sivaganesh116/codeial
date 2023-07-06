const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){

    Post.find({})
    .populate('user') //populate the user of each post
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .then(posts=>{
        User.find({})
        .then(users=>{
            return res.render('home', {
                title: 'codeial | Home',
                posts: posts,
                all_users: users
            });
        })
    })
    .catch(err=>{
        console.log("Error finding posts: ", err);
    })
}

