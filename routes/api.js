const router = require('express').Router(),
db = require('../models');

router.route('/')
  .get((req, res) => {
     db.Post.find().remove().exec().then(() => res.send('cleared'));
   });

router.route('/users')
  .get((req, res) => {
    db.User.find()
      .then(users => res.status(200).json(users))
      .catch(err => res.status(400).json(err));
  })
  .post((req, res) => {
    db.User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(400).json(err));
  });

router.route('/posts')
  .get((req, res) => {
    db.Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json(err));
  });

router.route('/users/:id/post')
  .get((req, res, next) => {
    db.User.findById(req.params.id)
      .populate("posts", {image: true})
      .then(user => res.status(200).json(user.posts))
      .catch(next);
  })
  .post((req, res, next) => {
    const newPost = {
      image: req.body.image,
      uid: req.params.id
    };

    db.Post.create(newPost)
      .then(post => {
      db.User.findById(req.params.id)
        .then(user => {
          user.posts.push(post.id);
          user.save().then(user => {
            return db.Post.findById(post._id)
              .populate("uid", {username: true})
          }).then(m => {
            return res.status(200).json(m);
          }).catch(next);
      }).catch(next);
    }).catch(next);
  });

module.exports = router;
