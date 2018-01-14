const router = require('express').Router(),
auth = require('../middleware/auth'),
handler = require('../handler/api');

router.route('/')
  .get((req, res) => {
     db.User.find().remove().exec().then(() => res.send('cleared'));
   });

router.route('/users')
  .get(handler.allUsers);

router.route('/users/:uid')
  .get(auth.loginRequired, auth.authorizationRequired, handler.getUser);

router.route('/users/:uid/post')
  .get(handler.getUserPosts)
  .post(auth.loginRequired, auth.authorizationRequired, handler.createPost);

router.route('/users/:uid/post/:pid')
  .get(handler.getPost)
  .put(auth.loginRequired, auth.authorizationRequired, handler.updatePost)
  .delete(auth.loginRequired, auth.authorizationRequired, handler.deletePost);

router.route('/posts')
  .get(handler.allPosts);

router.route('/posts/:pid')
  .get(handler.getPost);

module.exports = router;
