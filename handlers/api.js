const db = require('../models');

module.exports.allUsers = (req, res) => {
  db.User.find().sort({created_at: 'desc'})
    .populate('follows', {username: true, _id: true})
    .populate('followers', {username: true, _id: true})
    .populate('posts', {image: true, caption: true})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err));
};

module.exports.allPosts = (req, res) => {
  db.Post.find().sort({created_at: 'desc'})
    .populate('uid', {username: true})
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json(err));
};

module.exports.getUser = (req, res) => {
  db.User.findOne({username: req.params.username})
    .populate('posts', {image: true, caption: true})
    .then(user => {
      if (user) return user;
      res.status(400).json({message: 'User does not exist'});
    }).then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};

module.exports.updateUser = (req, res) => {
  db.User.update({username: req.params.username},
      {avatar: req.body.avatar}
    ).then(user => res.status(200).json({message: 'User updated'}))
    .catch(err => res.status(400).json(err));
}

module.exports.followUser = (req, res) => {
  db.User.findOne({username: req.params.username})
    .then(user => {
      user.follows.push(req.params.followid);
      user.save();
      return user;
    }).then(user => {
      db.User.findById(req.params.followid)
        .then(followed => {
          followed.followers.push(user._id);
          followed.save();
          res.status(200).json({message: 'User followed'});
        });
    }).catch(err => res.status(400).json(err));
}

module.exports.getUserPosts = (req, res, next) => {
  db.User.findOne({username: req.params.username})
    .populate('posts', {image: true, caption: true})
    .then(user => {
      if (user) return user;
      res.status(400).json({message: 'User does not exist'});
    }).then(user => res.status(200).json(user.posts))
    .catch(next);
};

module.exports.getPost = (req, res, next) => {
  db.Post.findById(req.params.pid)
    .populate("uid", {username: true})
    .then(post => res.status(200).json(post))
    .catch(next);
};

module.exports.createPost = (req, res, next) => {
  db.User.findOne({username: req.params.username})
    .then(user => {
      db.Post.create({
        image: req.body.image,
        caption: req.body.caption,
        uid: user.id
      }).then(post => {
        user.posts.push(post._id);
        user.save().then(user => {
          return db.Post.findById(post._id)
            .populate("uid", {username: true})
        }).then(m => {
          return res.status(200).json(m);
        }).catch(next);
      }).catch(next);
    }).catch(next);
};

module.exports.updatePost = (req, res, next) => {
  db.Post.findById(req.params.pid)
    .then(post => post.update({
      image: req.body.image,
      caption: req.body.caption
    }))
    .then(res.status(200).json({message: 'updated post'}))
    .catch(next);
}

module.exports.deletePost = (req, res, next) => {
  db.Post.findById(req.params.pid)
    .then(post => post.remove())
    .then(res.status(200).json({message: 'deleted post'}))
    .catch(next);
};
