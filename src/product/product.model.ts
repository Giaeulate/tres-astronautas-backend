import * as mongoose from 'mongoose';

export const PRODUCT_MODEL_NAME = 'Product';

export const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth'}, 
    expired_date: { type: Date },
    image: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

export interface ProductModel {
  id: string;
  name: string;
  price: number;
  owner: string;
  expired_date: Date;
  image: string;
}
