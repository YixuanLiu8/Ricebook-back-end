const Profile = require('./profileSchema');
const errHandler = require('./ErrHandler/errHandler');

const getProfile = (req, res) => {
    Profile.findOne({'username': req.user})
        .exec((err, result) => {
            if (err) {
                res.sendStatus(401);
                return errHandler(err);
            }
            if (result) {
                return res.send({
                    username: result.username,
                    email: result.email,
                    phone: result.phone,
                    dob: result.dob,
                    zipcode: result.zipcode,
                    headline: result.headline,
                    avatar: result.avatar,
                    follower:result.follower,
                    result: 'success'
                })
            }return res.sendStatus(400);
        })
}
/*const putUsername = (req, res) => {
    if (!req.body.username) return res.sendStatus(400);
    (async () => {
        let profile = await Profile.findOne({'username': req.user});
        profile.username = req.body.username;
        await profile.save();
        return res.send({
            username: req.user,
            result: 'success'
        })
    })()
}
*/
const getPhone = (req, res) => {
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
                    phone: result.phone,
                    result: 'success'
                })
            }
            return res.sendStatus(400);
        })
}
const putPhone = (req, res) => {
    if (!req.body.phone) return res.sendStatus(400);
    (async () => {
        let profile = await Profile.findOne({'username': req.user});
        profile.phone = req.body.phone;
        await profile.save();
        return res.send({
            username: req.user,
            phone:profile.phone,
            result: 'success'
        })
    })()
}

const getHeadline = (req, res) => {
    let user = req.user
       if (req.params.user) {user = req.params.user};
         Profile.findOne({'username': user})
        .exec((err, result) => {
            if (err) {
                res.sendStatus(401);
                return errHandler(err);
            }
            if (result) {
                //console.log(result)
                return res.send({
                    username: user,
                    headline: result.headline,
                    result: 'success'
                })
            }
            return res.sendStatus(400);
        })
}

const putHeadline = (req, res) => {
    if (!req.body.headline) return res.sendStatus(400);
    (async () => {
        let profile = await Profile.findOne({'username': req.user});
        profile.headline = req.body.headline;
        await profile.save();
        return res.send({
            username: req.user,
            headline: profile.headline,
            result: 'success'
        })
    })()
}

const getEmail = (req, res) => {
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
                    email: result.email,
                    result: 'success'
                })
            }
            return res.sendStatus(400);
        })
}

const putEmail = (req, res) => {
    if (!req.body.email) return res.sendStatus(400);
    (async () => {
        let profile = await Profile.findOne({'username': req.user});
        profile.email = req.body.email;
        //console.log(profile)
        await profile.save();
        return res.send({
            username: req.user,
            email: profile.email,
            result: 'success'
        })
    })()
}

const getZipcode = (req, res) => {
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
                    zipcode: result.zipcode,
                    result: 'success'
                })
            }
            return res.sendStatus(400);
        })
}

const putZipcode = (req, res) => {
    if (!req.body.zipcode) return res.sendStatus(400);
    (async () => {
        let profile = await Profile.findOne({'username': req.user});
        profile.zipcode = req.body.zipcode;
        await profile.save();
        return res.send({
            username: req.user,
            zipcode: profile.zipcode,
            result: 'success'
        })
    })()
}

const getDob = (req, res) =>{
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
                    dob: result.dob,//(new Date('01/01/2000')).toDateString()
                    result: 'success'
                })
            }
            return res.sendStatus(400);
        })
}

//TODO: FIX THIS END-POINT
const getAvatars = (req, res) => {
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
                    avatars: result.avatars,
                    result: 'success'
                })
            }
            return res.sendStatus(400);
        })
}

const putAvatars = (req, res) => {
    if (!req.body.avatars) return res.sendStatus(400);
    (async () => {
        let profile = await Profile.findOne({'username': req.user});
        profile.avatars = req.body.avatars;
        await profile.save();
        return res.send({
            username: req.user,
            avatars: profile.avatars,
            result: 'success'
        })
    })()
}

module.exports = app => {
    app.get('/phone',getPhone)
    app.put('/phone',putPhone)
    //app.put('/username',putUsername)
    app.get('/profile',getProfile)
    app.get('/headline/:user?', getHeadline)
    app.put('/headline', putHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', putZipcode)
    app.get('/dob',getDob)
    app.get('/avatar/:user?', getAvatars)
    app.put('/avatar', putAvatars)
}
