import { Schema, model, Document } from "mongoose";
import { User } from "./User";

const BookSchema = new Schema({
  title: String,
  author: String,
  isbn: String,
  pages: Number,
  dateread: Date,
  rating: Number,
  cover: String,
  reader_id: String,
});

export interface Book extends Document {
  title: string;
  author: string;
  isbn: string;
  pages: number;
  dateread: Date;
  rating: number;
  cover: string;
  reader_id: string;
  _id: string;
}

const BookModel = model<Book>("Book", BookSchema);

export default BookModel;
