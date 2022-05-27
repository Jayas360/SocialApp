const User = require('../models/user');
const Post = require('../models/post');
const { post } = require('../routes/users');
const { findById } = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err, user){
        return res.render('user_profile',{
            title:"User Profile",
            profile_user: user
        });
    })
    
};

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.user.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('****Multer Error: ', err);}
                user.name = req.body.name; 
                user.email = req.body.email;
                if(req.file){
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save(); 
                return res.redirect('back');
            }); 
        } catch (error) {
            req.flash('error',error);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp = function(req, res){   
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"Codeil| sign up"
    });
};

//render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"Codiel | sign in"
    })
};

//get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');

    }
    User.findOne({email: req.body.email}, function(err, user) {
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user) {
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}


//sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', "Logged in successfully");
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', "You have logged out");
    return res.redirect('/');
}
