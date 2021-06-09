const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  // Which person is followed
  followed: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  // Which person is following
  following: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
});

const Connection = mongoose.model("Connection", connectionSchema);
module.exports = Connection;
