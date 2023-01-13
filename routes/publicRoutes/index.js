const express = require("express");
const {
  registerUser,
  getSponsorName,
  authUser,
  ForgotPassword,
  resetPassord,
  sendOtp,
  checkMobileNumber,
  checkEmail,
  checkSponsorId,
  sendMessage,
  getVideoLink,
  getPDFLink,
  insertRandomLevelIncomeData,
  CleanTopupAndPools,
  testAutopool,
} = require("../../controllers/publicControllers/index");
const testBooster = require("../../controllers/script");
const {
  registerValidators,
  registerValidationHandler,
  loginValidators,
  loginValidationHandler,
  forgotPasswordValidators,
  forgotPasswordValidationHandler,
  resetPasswordValidationHandler,
  resetPasswordValidators,
  ContactValidationHandler,
  ContactValidators,
} = require("../../validation/inputValidation");
const router = express.Router();

router.post(
  "/register",
  registerValidators,
  registerValidationHandler,
  registerUser
);
router.get("/get_sponsor/:user_id", getSponsorName);
router.post("/login", loginValidators, loginValidationHandler, authUser);
router.post(
  "/forgot_password",
  forgotPasswordValidators,
  forgotPasswordValidationHandler,
  ForgotPassword
);
router.post(
  "/reset_password/:token",
  resetPasswordValidators,
  resetPasswordValidationHandler,
  resetPassord
);
router.post("/send_otp", sendOtp);
router.get("/check_mobile/:mobile", checkMobileNumber);
router.get("/check_email/:email", checkEmail);
router.get("/check_sponsor_id/:sponsor_id", checkSponsorId);
router.post(
  "/send_message",
  ContactValidators,
  ContactValidationHandler,
  sendMessage
);
router.get("/get_video_link", getVideoLink);
router.get("/get_pdf_link", getPDFLink);

// router.post("/clean", CleanTopupAndPools);
router.post("/test_autopool", testAutopool);
router.post("/test_booster", testBooster);

module.exports = router;
