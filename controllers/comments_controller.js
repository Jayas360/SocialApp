const { localsName } = require('ejs');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){

    try {
        let post = await Post.findById(req.body.postId);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user.id,
                post: req.body.postId
            });
            post.comments.push(comment);
            post.save();

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment,
                        user: req.user
                    },
                    message: 'Comment created!'
                })
            }

            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

module.exports.destroy = async function(req, res){ 
    try {
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            comment.remove();
            let post = await Post.findById(comment.post);
            post.comments.pull(comment.id);
            post.save();
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error', err);
        return;
    }
}