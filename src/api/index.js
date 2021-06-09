const express = require('express');
const auth =require('./auth/services/auth');
const user = require('./user/services/user');
const partner = require('./partnership/services/partnership');
const wallet = require('./wallet/services/wallet');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Noba Africa API - 👋🌎🌍🌏'
  });
});

router.use('/client', auth)
router.use('/user', user);
router.use('/partner', partner);
router.use('/wallet', wallet);

module.exports = router;
