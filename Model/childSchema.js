//import mongoose
const mongoose = require("mongoose");

//auto increment id
const autoIncrement = require("mongoose-sequence")(mongoose);

//define address schema
const AddressSchema = new mongoose.Schema(
  {
    city: { type: String },
    street: { type: String },
    building: { type: String },
  }
);

//create schema
const childSchema = new mongoose.Schema({
  _id:Number,  
  fullName: { type: String, required: true },
  age: {
    type: Number,
    min: [4, "Age must be at least 4 years old."], //minimum age
    max: [8, "Age cannot exceed 8 years."], //maximum age
    required: true,
  },
  level: { type: String, enum: ["PreKG", "KG1", "KG2"], required: true },
  address: AddressSchema,
});

//plugin with child schema
childSchema.plugin(autoIncrement, { id: "child_id_counter" });


//export schema object for crud operations
module.exports = mongoose.model("Children", childSchema);
