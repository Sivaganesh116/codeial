const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .then(user=>{
        return res.render('user_profile', {profile_user: user, title: 'User Profile'});
    })
    .catch(err=>{
        console.log('Error finding profile user: ', err);
    })
}

module.exports.update = function (req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        .then(user=>{
            return res.redirect('back');
        })
        .catch(err=>{
            console.log('Error finding the user: ', err);
        })
    } else {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.settings = function(req, res){
    res.end("<h1> User Settings </h1>");
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    })
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    })
}

module.exports.create = async function(req, res){
    try{
        if(req.body.password != req.body.confirm_password) return res.redirect('back');

        let user = await User.findOne({email: req.body.email})
        
        if(!user){
            let newUser = User.create(req.body)
            return res.redirect('/users/sign-in');
        }
        else{
            console.log("User already exists: ", user);
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error :", err);
    }
}

module.exports.createSession = function(req, res){
    //using  pasportjs
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout((err)=>{
        if(err){
            console.log("Error logging out: ", err);
            return;
        }
        return res.redirect('/');
    });
}