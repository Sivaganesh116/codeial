const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destory = function(req, res){
    Post.findById(req.params.id)
    .then(post=>{
        // check if the user who is trying to delete the post is the same user who created the post
        if(post.user == req.user.id){
            Post.deleteOne({ _id: req.params.id })
            .then(() => {
                Comment.deleteMany({ post: req.params.id })
                .then(() => {
                return res.redirect('back');
                })
                .catch(err => {
                // Handle Comment deletion error
                console.log('Error deleting comments: ', err);
                return res.redirect('back');
                });
            })
            .catch(err=>{
            console.log('Error deleting post: ', err);
            })
        }
        else{
            return res.redirect('back');
        }
    })
    .catch(err=>{
        console.log('Error finding the post: ', err);
    })
}