const express = require('express');
const passport = require('passport');

const router = express.Router();
const controller = require('../controller/wallet.controller');

router.get('/net-balance',
  passport.authenticate('jwt',{session:false}),
  controller.getWalletNetBalance
);

router.get('/widthrawable',
  passport.authenticate('jwt',{session:false}),
  controller.getWalletWidthdrawableBalance
);

router.get('/widthrawed',
  passport.authenticate('jwt',{session:false}),
  controller.getTotalWidthdrawal
);

router.post('/fund',
  passport.authenticate('jwt',{session:false}),
  controller.fundAccount
);

router.post('/validate-payment', 
  passport.authenticate('jwt',{session:false}),
  controller.validatePayment
);

router.post('/verify-payment',
  passport.authenticate('jet',{session:false}),
  controller.verifyPayment
);
router.post('/widthraw', 
  passport.authenticate('jwt',{session:false}),
  controller.widthrawFund
)
// router.post('/webhook', 
//   passport.authenticate("jwt",{session:false}),
//   controller.webhook
// );

module.exports = router;
