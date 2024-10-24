import { Schema, model, Document } from "mongoose";
import { IRequest } from "./request.interface";

// Mongoose Schema for Address
const addressSchema = new Schema({
  division: { type: String, required: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  hospital: { type: String, required: true },
});

// Mongoose Schema for Status

const statusSchema = new Schema({
  status: { type: String, required: true },
  time: { type: Date, required: true },
  reason: { type: String, required: false },
});

// Mongoose Schema for Request
const requestSchema = new Schema({
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  donorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bloodGroup: { type: String, required: true },
  plasma: { type: Boolean, required: true },
  isEmergency: { type: Boolean, required: true },
  location: { type: addressSchema, required: true },
  patientProblem: { type: String, required: true },
  status: { type: [statusSchema], required: true },
  requestExpiresAt: { type: Date, required: true },
});

const RequestModel = model<IRequest & Document>("Request", requestSchema);

export default RequestModel;