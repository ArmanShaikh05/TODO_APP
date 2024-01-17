import jwt from "jsonwebtoken";

export const sendCookie = (newUser, res, message, statusCode) => {
  const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
