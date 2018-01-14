const router = require('express').Router(),
db = require('../models'),
jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  db.User.findOne({username: req.body.username}).then(user => {
    user.comparePassword(req.body.password, (err, match) => {
      if (match) {
        let token = jwt.sign(
          { id: user._id}, process.env.SECRET_KEY
        );
        res.status(200).json({uid: user.id, username: user.username, token});
      } else {
        res.status(400).json({message: 'Invalid Username/Password.'})
      }
    })
  }).catch(err => {
    res.status(400).json({message: 'Invalid Username/Password'})
  })
});


router.post('/register', (req, res) => {
  db.User.create(req.body).then(user => {
    let token = jwt.sign(
      {username: user.username}, process.env.SECRET_KEY
    );
    res.status(200).json({user});
  }).catch(err => {
    res.status(400).json({message: 'Username already taken'});
  });
});

module.exports = router;
