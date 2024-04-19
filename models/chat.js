const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    maxLenght: 50,
  },
  created_at: {
    type: Date,
    require: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
