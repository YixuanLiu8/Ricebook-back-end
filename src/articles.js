const Articles = require('./articleSchema');
const Profile = require('./profileSchema');
const errHandler = require('./ErrHandler/errHandler');

const postArticles=(req,res)=>{
    (async () => {
        await Articles.create({
            name: req.user,
            content: req.body.content,
            title: req.body.title,
            image: req.body.image,
        })
        let articles = await Articles.find({'name': req.user});
        if (articles) {
            return await res.send({
                username: req.user,
                articles: articles,
                result: 'success'
            })
        }
        return res.sendStatus(400);
    })();
}
const getArticles=(req,res)=>{
    if (req.params.id) {/** take specific id  */
    // if is user id
    Profile.findOne({'username': req.params.id})
        .exec((err, result) => {
            if (err) {
                res.sendStatus(400);
                return errHandler(err);
            }
            if (result) {
                Articles.find({'name': req.params.id})
                    .exec((err, status) => {
                        if (err) {
                            res.sendStatus(400);
                            return errHandler(err);
                        }
                        if (result) {
                            return res.send({
                                articles: [result],
                                result: 'success'
                            })
                        }
                        return res.sendStatus(400);
                    })
            } else {
                // if is article id
                Articles.findOne({'_id': req.params.id})
                    .exec((err, result) => {
                        if (err) {
                            res.sendStatus(400);
                            return errHandler(err);
                        }
                        if (result) {
                            return res.send({
                                articles: [result],
                                result: 'success'
                            })
                        }
                        return res.sendStatus(400);
                    })
            }
        })
    } else {
        Profile.findOne({'username': req.user})
            .exec((err, result) => {
                if (err) {
                    res.sendStatus(400);
                    return errHandler(err);
                }
                if (result) {
                    // find user's post
                    Articles.find({'name': [req.user, ...result.follower]})
                        .exec((err, userPosts) => {
                            if (err) {
                                res.sendStatus(400);
                                return errHandler(err);
                            }
                            return res.send({
                                username: req.user,
                                articles: userPosts,
                                result: 'success'
                            })
                        })
                }

            })
    }
}
const putArticles=async (req,res)=>{
       let articles= await Articles.findOne({'_id':req.params.id});
        articles.content=req.body.text;
        await articles.save();
        let posts = await Articles.find({'name': req.user});
    res.send({articles: posts, result: 'success'})
}


module.exports = (app) => {
    app.get('/articles/:id?', getArticles);
    app.put('/articles/:id', putArticles);
    app.post('/article', postArticles);
}

