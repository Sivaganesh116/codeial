const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        console.log("New Post:")
        console.log(post);
        req.flash('success', 'Post published!');
        return res.redirect('back');
    } catch(err){
        req.flash("error", err);
        return res.redirect('back');
    }
}

module.exports.destory = async function(req, res){
    try{
        let post = await Post.findById(req.params.id)
        // check if the user who is trying to delete the post is the same user who created the post
        if(post.user == req.user.id){
            await Post.deleteOne({ _id: req.params.id })

            await Comment.deleteMany({ post: req.params.id })
            req.flash('success', 'Post and associated commenets are deleted!');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Unauthorized!');
            return res.redirect('back');
        }
    } catch(err){
        console.log("Error: ", err)
        return res.redirect('back');
    }
    
}