const User = require('../models/user')

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile',{
                    title: "user Profile",
                    user: user
                }) 
            }else{
                return res.redirect('/users/sign-in');

            }

        });
    }else{
        return res.redirect('/users/sign-in');
    }

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
        console.log('passwords do not match');
    }

    User.findOne({email: req.body.email} , function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');

        }

    })
}

//sign in and create a session for the user.
module.exports.createSession = function(req,res){
    //steps to authenticate 
    
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing in'); return}

        //handle the user found
        if(user){

            //handle passwords don't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else{
            res.redirect('back');
        }
    });
}