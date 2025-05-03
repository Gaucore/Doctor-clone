import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  specialization: string;
  education: string;
  description: string;
  fees: number;
  rating: number;
  location: string;
  available: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the doctor name'],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, 'Please provide the specialization'],
      trim: true,
    },
    education: {
      type: String,
      required: [true, 'Please provide the education details'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
    },
    fees: {
      type: Number,
      required: [true, 'Please provide the consultation fee'],
      min: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    location: {
      type: String,
      required: [true, 'Please provide the location'],
      trim: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
