const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post)
    .then(post=>{
        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
        .then(comment=>{
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        })
        .catch(err=>{
            console.log('Error creating comment: ', err);
        })
    })
    .catch(err=>{
        console.log('Error finding post: ', err);
    })
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id)
    .then(comment=>{
        if(req.user.id == comment.user){
            // let postId = comment.post;
            Comment.deleteOne({_id : req.params.id})
            .then(comment=>{
                Post.findByIdAndUpdate(
                    comment.post,
                    {$pull: {comments: req.params.id}}
                )
                .then(post=>{
                    return res.redirect('back');
                })
                .catch(err=>{
                    console.log("Error in finding post: ", err);
                })
            })
            .catch(err=>{
                console.log("Error in deleting comment: ", err);
            })
        } else {
            return res.redirect('back');
        }
    })
    .catch(err=>{
        console.log('Error finding comment: ', err);
        return res.redirect('back');
    })
}