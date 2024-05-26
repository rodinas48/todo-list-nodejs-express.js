const Task = require("../models/tasks");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const getTask = async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById({ _id });
    if (!task) {
      return res.status(404).send(`Task with id "${_id}" not found !`);
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const editTask = async(req, res) => {
 try {
   const _id = req.params.id;
   const task = await Task.findByIdAndUpdate(_id, req.body, {
     new: true,
     runValidators:true
   });
   if (!task) {
     return res.status(404).send(`Task with id "${_id}" not found !`);
   }
   res.status(200).send(task);
 } catch (error) {
   res.status(500).send(error.message);
 }
};
const deleteTask = async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findByIdAndDelete({ _id });
    if (!task) {
      return res.status(404).send(`Task with id "${_id}" not found !`);
    }
    res.status(200).send('task deleted successfully!')
  } catch (e) {
    res.status(500).send(e.message);
  }
};
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  editTask,
  deleteTask,
};
