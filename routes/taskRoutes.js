import express from "express";
import {
  deleteTask,
  getTask,
  newTask,
  updateTask,
} from "../controller/TaskController.js";
import { isAuthenticated } from "../Middlewares/authentication.js";

const router = express.Router();

// CREATING NEW TASK
router.post("/new", isAuthenticated, newTask);

// GETTING THE CREATED TASK
router.get("/mytasks", isAuthenticated, getTask);


// UPDATING AND DELETING A TASK
router
  .route("/mytasks/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
