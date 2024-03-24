//import mongoose
const mongoose = require("mongoose");

//auto increment
const autoIncrement = require("mongoose-sequence")(mongoose);

//create schema
const classSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "teachers",
  },
  children: [{ type: Number, required: true, ref: "Children" }],
});

//plugin with child schema
classSchema.plugin(autoIncrement, { id: "classes_id" });

module.exports = mongoose.model("classes", classSchema);
