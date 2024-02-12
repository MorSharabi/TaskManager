const mongoose = require("mongoose");
const schema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  pwd: {
    type: String,
    required: true,
    minLength: 6,
  },
  email: {
    type: String,
  },
  fullName: {
    type: String,
  },
});

module.exports = mongoose.model("User", schema);
