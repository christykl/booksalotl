import { Schema, model, Document } from "mongoose";
import { User } from "./User";

const BookSchema = new Schema({
  title: String,
  author: String,
  isbn: String,
  pages: Number,
  dateread: Date,
  rating: Number,
  reader: {
    _id: String,
    name: String,
    googleid: String,
  }
})

export interface Book extends Document {
  title: string;
  author: string;
  isbn: string;
  pages: number;
  dateread: Date;
  rating: number;
  reader: User;
}

const BookModel = model<Book>("Book", BookSchema);

export default BookModel