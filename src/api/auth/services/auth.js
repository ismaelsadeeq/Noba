const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth.controller');
const passport = require('passport')

router.post('/auth/sign-up',
  controller.register
);
router.post('/auth/login',
  controller.login
);

router.get('/auth/logout',
  passport.authenticate('jwt',{session:false}),
  controller.logout
);

router.post('/auth/send-code', 
  controller.sendCode
);
router.post('/auth/verify-email',
  controller.verifyEmail
);
router.post('/auth/reset-password',
  controller.resetPassword  
);


module.exports = router;
