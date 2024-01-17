import express from "express";
import {
  registerUser,
  getMyProfile,
  loginUser,
  logout,
} from "../controller/UserController.js";
import { isAuthenticated } from "../Middlewares/authentication.js";

const router = express.Router();

// REGISTER THE USER
router.post("/register", registerUser);

// LOGIN THE USER
router.post("/login", loginUser);

// LOGOUT THE USER
router.get("/logout", logout);

//GETTING THE PROFILE
router.get("/me", isAuthenticated, getMyProfile);

export default router;
