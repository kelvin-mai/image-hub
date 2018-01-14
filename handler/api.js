const db = require('../models');

module.exports.allUsers = (req, res) => {
  db.User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err));
};

module.exports.allPosts = (req, res) => {
  db.Post.find()
    .populate('uid', {username: true})
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json(err));
};

module.exports.getUser = (req, res) => {
  db.User.findById(req.params.uid)
    .populate('posts', {image: true})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};

module.exports.getUserPosts = (req, res, next) => {
  db.User.findById(req.params.uid)
    .populate("posts", {image: true})
    .then(user => res.status(200).json(user.posts))
    .catch(next);
};

module.exports.getPost = (req, res, next) => {
  db.Post.findById(req.params.pid)
    .populate("uid", {username: true})
    .then(post => res.status(200).json(post))
    .catch(next);
};

module.exports.createPost = (req, res, next) => {
  db.Post.create({
    image: req.body.image,
    uid: req.params.uid
  })
    .then(post => {
    db.User.findById(req.params.uid)
      .then(user => {
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
      image: req.body.image
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
