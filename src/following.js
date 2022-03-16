const Profile = require('./profileSchema');
const User= require('./userSchema');
const errHandler = require('./ErrHandler/errHandler');

const getFollower = (req,res) =>{
    if (req.params.user) {req.user = req.params.user};
    Profile.findOne({'username': req.user})
        .exec((err, result) => {
            if (err) {
                res.sendStatus(401);
                return errHandler(err);
            }
            if (result) {
                return res.send({
                    username: req.user,
                    follower: result.follower,
                    result: 'success'
                })
            }
            return res.sendStatus(400);
        })
}

const putFollower=async(req,res)=>{
    let exist= await User.findOne({'username':req.params.user})
    if(!exist){
        return res.sendStatus(401)
    }else {
        console.log(exist)
        Profile.findOneAndUpdate(
            {'username': req.user},
            {$push: {follower: req.params.user}},
            (err, result) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.send({
                        username: req.user,
                        follower: [...result.follower, req.params.user],
                        result: 'success'
                    })
                }
            });
    }
    /*Profile.findOneAndUpdate(
        {'username': req.user},
        {$push: {follower: req.params.user}},
        (err, result) => {
            if (err) {
                return res.sendStatus(400);
            } else {
                return res.send({
                    username : req.user,
                    follower: [...result.follower, req.params.user],
                    result: 'success'
                })
            }
        });*/
}

const delFollower=(req,res)=>{
    Profile.findOneAndUpdate(
        {'username': req.user},
        {$pull: {follower: req.params.user}},
        (err, result) => {
            if (err) {
                return res.sendStatus(400);
            } else {
                return res.send({
                    username : req.user,
                    follower: result.follower.filter(ele => ele !== req.params.user),
                    result: 'success'
                })
            }
        });
}

module.exports = (app) => {
    app.get('/following/:user?', getFollower);
    app.put('/following/:user', putFollower);
    app.delete('/following/:user', delFollower);
}
