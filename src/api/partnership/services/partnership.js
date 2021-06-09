const express = require('express');

const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/parnership.controller');

// Parnership Routes
router.post('/partner', 
  passport.authenticate('jwt',{session:false}),
  controller.partner
);
router.get('/current-balance',
  passport.authenticate('jwt',{session:false}),
  controller.getCurrentParnershipBalance
);
router.get('/current-detail',
  passport.authenticate('jwt',{session:false}),
  controller.getCurrentParnershipDetail
);
router.get('/all-balance',
  passport.authenticate('jwt',{session:false}),
  controller.getAllParnershipBalance
);
router.get('/all-detail',
  passport.authenticate('jwt',{session:false}),
  controller.getAllParnershipDetail
);
router.get('/expected-payout',
  passport.authenticate('jwt',{session:false}),
  controller.expectedPayout
);
router.get('/commulative-payout',
  passport.authenticate('jwt',{session:false}),
  controller.commulativePayout
);

//Package Routes
router.post('/',
  passport.authenticate('jwt',{session:false}),
  controller.createPackage
);

router.put('/:id',
  passport.authenticate('jwt',{session:false}),
  controller.editPackage
);

router.get('/',
  passport.authenticate('jwt',{session:false}),
  controller.getPackages
);
router.get('/:id',
  passport.authenticate('jwt',{session:false}),
  controller.getAPackage
);
router.delete('/:id',
  passport.authenticate('jwt',{session:false}),
  controller.deletePackage
);

module.exports = router;