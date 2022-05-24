const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.postId, function(err, post){
        if(err){
            //handle error
        }
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user.id,
                post: req.body.postId
            }, function(err, comment){
                if(err){
                    console.log('error in creating comment');
                    return;
                }

                post.comments.push(comment);
                post.save();

                return res.redirect('back');
            }) 
        }
    })   
}

module.exports.destroy = function(req, res){ 
    Comment.findById(req.params.id, function(err, comment){
        if(err){

        }
        if(comment.user == req.user.id){
            comment.remove();
            Post.findById(comment.post, function(err, post){
                post.comments.pull(comment.id);
                post.save();
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }

    })
}