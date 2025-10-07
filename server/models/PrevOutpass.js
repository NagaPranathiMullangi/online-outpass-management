import mongoose from "mongoose";

const PrevOutpassSchema = mongoose.Schema({
  name: { type: String },
  enrollment: { type: String },
  room: { type: String },
  duration: { type: Number },
  fromDate: { type: Date },
  toDate: { type: Date },
  hostel: { type: String },
  purpose: { type: String },
  address: { type: String },
  outpassId: { type: String },
  evaluation: { type: Boolean },
  ImageURL: { type: String },
  employeeId: { type: String },
});

export default mongoose.model(
  "PrevOutpass",
  PrevOutpassSchema,
  "PrevOutpasses"
);
