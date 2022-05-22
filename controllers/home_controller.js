const Post = require('../models/post');

module.exports.home = function(req, res){  
    Post.find({}).populate('user').exec(function(err, posts){
       // console.log(posts);
        return res.render('home', {
            title:"Codeial | Home",
            posts: posts
        });
    })
}