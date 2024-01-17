import mongoose from "mongoose";

const database = ()=>{
    mongoose
  .connect(process.env.MONGODB_URI, { dbName: "TodoApp" })
  .then(() => {
    console.log("database connected");
  });
}

export default database