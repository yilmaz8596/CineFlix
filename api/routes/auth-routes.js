import express from "express";
import {
  register,
  login,
  verifyEmail,
  passwordResetRequest,
  passwordReset,
  googleLogin,
  googleRegister,
} from "../controllers/auth-controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-email/:token", verifyEmail);
router.post("/password-reset-request", passwordResetRequest);
router.post("/password-reset/:token", passwordReset);
router.post("/google-login", googleLogin);
router.post("/google-register", googleRegister);
export default router;
