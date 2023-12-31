const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({})
                .populate('user') //populate the user of each post
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user'
                    }
                })

        let users = await User.find({})
        if(req.isAuthenticated()){
            return res.render('home', {
                title: 'codeial | Home',
                posts: posts,
                all_users: users
            });
        } else {
            req.flash('error', 'Log in to unlock more features!');
            return res.render('home', {
                title: 'codeial | Home',
                posts: posts,
                all_users: users
            });
        }
    } catch(err){
        console.log("Error: ", err);
    }
    
}

