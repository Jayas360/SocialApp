const Friendship = require('../models/friendship');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){ 
    
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });

        let users = await User.find({});
        let friends = [];
        if(req.user){
            let user = await User.findById(req.user._id)
            .populate({
            path: 'friendships', 
            populate:{
                path: 'from_user to_user',
            }
            });
            
            friends = user.friendships;
            //console.log('friends',friends);
        }
        

        return res.render('home', {
            title:"Codeial | Home",
            posts: posts,
            all_users: users,
            friends: friends
        });
    } catch (error) {
        console.log('Error',error);
        return;
    }
}