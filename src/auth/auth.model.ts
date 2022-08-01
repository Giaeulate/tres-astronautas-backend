import * as mongoose from 'mongoose';

export const AUTH_MODEL_NAME = 'Auth';

export const AuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    document_number: { type: String },
    name: { type: String },
    last_name: { type: String },
    birthdate: { type: Date },
    image: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

export interface AuthModel {
  id: string;
  email: string;
  password: string;
  document_number: string;
  name: string;
  last_name: string;
  birthdate: Date;
  image: string;
}
