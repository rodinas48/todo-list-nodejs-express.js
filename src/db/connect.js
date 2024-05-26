const mongoose = require("mongoose");

const connectDB = (url) => {
  //connect mongodb with mongoose 
    return mongoose.connect(url)
}
  
module.exports = connectDB;