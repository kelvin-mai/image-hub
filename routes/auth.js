const router = require('express').Router(),
handle = require('../handlers/auth');

router.post('/login', handle.login);
router.post('/register', handle.register);

module.exports = router;
