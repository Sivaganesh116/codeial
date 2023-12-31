const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, (req, email, password, done)=>{
            //find a user and establish identity
            User.findOne({email: email})
            .then(user=>{
                if(!user || user.password != password){
                    req.flash('error', 'Invalid Username/Password');
                    console.log('Invalid Username/Password');
                    return done(null, false);
                }else{
                    return done(null, user);
                }
            })
            .catch(err=>{
                req.flash('error', err);
                console.log("Error in finding user --> Passport");
                return done(err);
            })
        }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done)=>{
    done(null, user.id);
})

//deserializing the user from the key in cookies
passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then(user=>{
        return done(null, user);
    })
    .catch(err=>{
        console.log("Error in finding user --> Passport");
        return done(err);
    })
})

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error', 'Log in to proceed');
        return res.redirect('/users/sign-in');
    }
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contais the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;