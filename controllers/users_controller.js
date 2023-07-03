const db = require('../config/mongoose.js');
const User = require('../models/user')

module.exports.profile = function(req, res){
    res.end("<h1> User Profile </h1>");
}

module.exports.settings = function(req, res){
    res.end("<h1> User Settings </h1>");
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    })
}

module.exports.signIn = function(req, res){
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
    
}