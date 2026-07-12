import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  employeeId: {
    type: String,
    required: true,
    unique: true,
  },

  dob: {
    type: Date,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  maritalStatus: {
    type: String,
    required: true,
  },

  designation: {
    type: String,
    required: true,
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "employee",
  },

  image: {
    type: String,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;