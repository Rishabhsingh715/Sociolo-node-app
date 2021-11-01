const User = require('../models/user')

module.exports.profile = function(req,res){
    res.render('home',{
        title: 'user-profile'
    });
}

//render the signup page
module.exports.signUp = function(req,res){

    return res.render('user_sign_up', {
        title: 'Sociolo | Sign Up'
    });
}

//render the signin page
module.exports.signIn = function(req,res){

    return res.render('user_sign_in', {
        title: 'Sociolo | Sign In'
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email} , function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                console.log('i ran user created');
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');

        }

    });
}

//sign in and create a session for the user.
module.exports.createSession = function(req,res){
    console.log('i ran bro session waala function');
    return res.redirect('/');
}