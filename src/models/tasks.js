const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is provided"],
    trim: true,
    maxlength:[50,'must be less than 50 characters']
  },
  completed: {
    type: Boolean,
    default: false,
    
  },
});

const model = mongoose.model('Task', TaskSchema);

module.exports = model;