const express = require("express");
const passport = require("passport")
const controller = require('../controllers/user.controller');
const router = express.Router();


router.put("/generate-referral-code",
  passport.authenticate("jwt",{session:false}),
  controller.generateReferral
);
router.put("/:id/delete-account",
  passport.authenticate("jwt",{session:false}),
  controller.suspendAccount
);
// Get single user Use appropriate method (POST, GET, PUT, DELETE)
router.get("/",
  passport.authenticate("jwt",{session:false}),
  controller.getUser
);
router.get("/getAllUsers",
  passport.authenticate("jwt",{session:false}),
  controller.getAllUsers
);
router.get("/getAllAdmin",
  passport.authenticate("jwt",{session:false}),
  controller.getAdmins
);
// Update single user use appropriate method (POST, GET, PUT, DELETE)
router.put("/", 
  passport.authenticate("jwt",{session:false}),
  controller.updateUser
);
router.put("/bank-detail",
  passport.authenticate("jwt",{session:false}),
  controller.updateBankDetails
);
module.exports = router;
