const db = require('../models'),
jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
  db.User.findOne({username: req.body.username}).then(user => {
    user.comparePassword(req.body.password, (err, match) => {
      if (match) {
        let token = jwt.sign(
          { username: user.username}, process.env.SECRET_KEY
        );
        res.status(200).json({uid: user.id, username: user.username, token});
      } else {
        res.status(400).json({message: 'Invalid Username/Password.'})
      }
    })
  }).catch(err => {
    res.status(400).json({message: 'Invalid Username/Password'})
  })
};

module.exports.register = (req, res) => {
  db.User.create(req.body).then(user => {
    let token = jwt.sign(
      {username: user.username}, process.env.SECRET_KEY
    );
    res.status(200).json({uid: user.id, username: user.username, token});
  }).catch(err => {
    res.status(400).json({message: 'Username already taken'});
  });
};
