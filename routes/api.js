const router = require('express').Router(),
db = require('../models');

router.route('/')
  .get((req, res) => {
     db.User.find().remove().exec().then(() => res.send('cleared'));
   });

router.route('/users')
  .get((req, res) => {
    db.User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.send(err));
  })
  .post((req, res) => {
    db.User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(400).json(err));
  });



module.exports = router;
