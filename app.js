import express from "express";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./data/database.js"
import { errorMiddleware } from "./Middlewares/errorhandler.js";
import cors from 'cors'


const app = express();

config({
    path:"./data/config.env"
})

// USING MIDDLEWARES
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))



// SETTING UP ROUTERS
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

connectDb()

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port:${process.env.PORT} and on ${process.env.NODE_ENV} mode`);
});


// USING ERROR HANDLER
app.use(errorMiddleware)