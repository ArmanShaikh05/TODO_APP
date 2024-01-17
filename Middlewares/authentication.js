import jwt from "jsonwebtoken"
import { user } from "../model/userModel.js";
import ErrorHandler from "./errorhandler.js";


export const isAuthenticated = async(req,res,next) =>{
    const {token} = req.cookies

    if (!token) return next(new ErrorHandler("Login First",400))

    const decoded =  jwt.verify(token,process.env.SECRET_KEY)

    req.user = await user.findById(decoded.id)
    next()
}