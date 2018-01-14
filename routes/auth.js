const router = require('express').Router(),
handler = require('../handler/auth');

router.post('/login', handler.login);
router.post('/register', handler.register);

module.exports = router;
