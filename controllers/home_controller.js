const Post = require('../models/post');

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
        return res.render('home', {
            title: 'codeial | Home',
            posts: posts
        });
    })
    .catch(err=>{
        console.log("Error finding posts: ", err);
    })
}

