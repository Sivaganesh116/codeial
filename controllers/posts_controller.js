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
        return res.redirect('back');
    } catch(err){
        console.log("Error: ", err)
    }
}

module.exports.destory = async function(req, res){
    try{
        let post = await Post.findById(req.params.id)
        // check if the user who is trying to delete the post is the same user who created the post
        if(post.user == req.user.id){
            await Post.deleteOne({ _id: req.params.id })

            await Comment.deleteMany({ post: req.params.id })

            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } catch(err){
        console.log("Error: ", err)
    }
    
}