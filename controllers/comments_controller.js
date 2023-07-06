const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post)
    
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user.id
        })
        
        post.comments.push(comment);
        post.save();

        return res.redirect('/');
    }catch(err){
        console.log("Erro: ", err);
    }
    
}

module.exports.destroy =async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id)
    
        if(req.user.id == comment.user){
            await Comment.deleteOne({_id : req.params.id})
            
            await Post.findByIdAndUpdate(
                comment.post,
                {$pull: {comments: req.params.id}}
            )
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error: ",err);
    }
}