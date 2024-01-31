import { Schema, model, Document } from "mongoose";
import { User } from "./User";

const BookSchema = new Schema({
  title: String,
  authors: [String],
  isbn: String,
  pages: Number,
  dateread: Date,
  rating: Number,
  cover: String,
  reader_id: String,
  publisher: String,
  published_date: String,
  preview_link: String,
  description: String,
  genre: String, 
  status: {
    type: String,
    default: "read",
  },
});

export interface Book extends Document {
  title: string;
  authors: [string];
  isbn: string;
  pages: number;
  dateread: Date;
  rating: number;
  cover: string;
  reader_id: string;
  publisher: string;
  published_date: string;
  preview_link: string;
  description: string;
  genre: string;
  _id: string;
  status: string;
}

const BookModel = model<Book>("Book", BookSchema);

export default BookModel;
