const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.create = async (req, res) => {
    if(req.user){
        try {
            let friend = await User.findById(req.params.id); 
            let user = await User.findById(req.user.id);
            if(friend && user){
                let friendship = await Friendship.create({
                    from_user: req.user.id,
                    to_user: req.params.id
                });
                friend.friendships.push(friendship._id);
                friend.save();
                user.friendships.push(friendship._id);
                user.save();
            }
            return res.redirect('back');           
        } catch (error) {
            console.log('error in creating friend', error);
            return res.redirect('back');
        }
    }else{
        return res.redirect('back');
    }
}

 

module.exports.remove = async (req, res) => {
    if(req.user){
        try {
            let friend = await User.findById(req.params.id); 
            let user = await User.findById(req.user.id);
            console.log('user', user);
            console.log('friend', friend);
            let friendship = null;
            if(friend && user){
                friendship = await Friendship.findOneAndDelete({
                    from_user: req.user.id,
                    to_user: req.params.id
                });
                console.log('sent delete', friendship);
                if(!friendship){
                    friendship = await Friendship.findOneAndDelete({
                        from_user: req.params.id,
                        to_user: req.user.id
                    });
                    console.log('recieved delete', friendship);
                }
                friend.friendships.pull(friendship._id);
                friend.save();
                user.friendships.pull(friendship._id);
                user.save();
            }
            return res.redirect('back');           
        } catch (error) {
            console.log('error in creating friend', error);
            return res.redirect('back');
        }
    }else{
        return res.redirect('back');
    }
}