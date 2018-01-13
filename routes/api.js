const router = require('express').Router(),
db = require('../models');

router.route('/')
  .get((req, res) => {
     res.json([{id: 1, name: 'dude'}, {id:2, name: 'bro'}]);
   })
   .post((req, res) => {
     res.json({test: true});
   });

router.route('/users')
  .get((req, res) => {
    db.User.find()
    .then(users => res.json(users))
    .catch(err => res.send(err));
  })
  .post((req, res) => {
    db.User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(err => res.send(err));
  });

module.exports = router;
