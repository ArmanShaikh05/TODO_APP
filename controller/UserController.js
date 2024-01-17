import { user } from "../model/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../Middlewares/errorhandler.js";

// REGISTER THE USER
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isUser = await user.findOne({ email });

    if (isUser) return next(new ErrorHandler("User Already Exists", 404));

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(newUser, res, "User Registered Successfully", 200);
  } catch (error) {
    next(error);
  }
};

// LOGIN THE USER
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const User = await user.findOne({ email }).select("+password");

    if (!User) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, User.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(User, res, `Welcome back, ${User.name}`, 200);
  } catch (error) {
    next(error);
  }
};

//GETTING THE PROFILE
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// LOGOUT THE USER
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};
