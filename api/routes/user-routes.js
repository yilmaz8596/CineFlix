import express from "express";
import {
  signout,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user-controllers.js";
import { verifyUser } from "../util/verify-user.js";
const router = express.Router();

router.get("/signout", signout);
router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
export default router;
