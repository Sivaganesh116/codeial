const db = require('../config/mongoose.js');
const User = require('../models/user')

module.exports.profile = function(req, res){
    if(req.cookies.email != null && req.cookies.email != undefined){
        User.findOne({email: req.cookies.email})
        .then((user)=>{
            console.log(user);
            return res.render("profile",{user_data: user, title: `Profile | ${user.name}`});
        })
        .catch((err)=>{
            console.log('Error finding user: ', err);
            return res.redirect('/users/sign-in');
        })
    }
    else return res.redirect('/users/sign-in');
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
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(user){
            if(user.password != req.body.password){
                console.log("Wrong Password");
                return res.redirect('back');
            }
            res.cookie('email', user.email);
            return res.redirect('/users/profile');
        } else {

        }
    })
    .catch((err)=>{
        console.log("Error finding user: ", err);
    })
}