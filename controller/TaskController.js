import ErrorHandler from "../Middlewares/errorhandler.js";
import { task } from "../model/taskModel.js";

// CREATING A NEW TASK
export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GETTING ALL THE CREATED TASKS
export const getTask = async (req, res) => {
  try {
    const userid = req.user._id;

    const alltasks = await task.find({ user: userid });

    res.status(200).json({
      success: true,
      alltasks,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATING A TASK

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Task = await task.findById(id);

    if (!Task) return next(new ErrorHandler("Task Not Found", 404));

    Task.isCompleted = !Task.isCompleted;
    await Task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

// DELETING A TASK

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Task = await task.findById(id);

    if (!Task) return next(new ErrorHandler("Task Not Found", 404));

    await Task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
