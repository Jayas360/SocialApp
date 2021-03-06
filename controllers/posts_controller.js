const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            res.status(200).json({
                data: {
                    post: post
                },
                message: "post created!"
            })
        }

        return res.redirect('back');
    } catch (err) {
        console.log('Error', err);
        return;
    }
};

module.exports.destroy = async function(req, res){
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id in to string
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            await Like.deleteMany({likeable: req.params.id, onModel:'Post'});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
    }

}