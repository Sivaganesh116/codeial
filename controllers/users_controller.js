
module.exports.profile = function(req, res){
    return res.render('user_profile', {title: `Profile | ${res.locals.user.name}`});
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

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password) return res.redirect('back');

    User.findOne({email: req.body.email})
    .then((user)=>{
        if(!user){
            User.create(req.body)
            .then((user)=>{
                return res.redirect('/users/sign-in');
            })
            .catch((err)=>{
                console.log('Error creating user: ', err);
                return;
            })
        }
        else{
            console.log("User already exists: ", user);
            return res.redirect('back');
        }
    })
    .catch((err)=>{
        console.log("Error finding user :", err);
    })
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