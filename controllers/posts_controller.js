const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then(post=>{
        console.log("New Post:")
        console.log(post);
        return res.redirect('back');
    })
    .catch(err=>{
        console.log("Error creating post: ", err);
    })
}