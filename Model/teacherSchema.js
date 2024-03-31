//import mongoose
const mongosse = require("mongoose");

//create schema
const TeacherSchema = mongosse.Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  role: { type: String, enum: ["admin", "teacher"], required: true },
});

module.exports = mongosse.model("teachers", TeacherSchema);
