import { Schema, model, Document } from "mongoose";

// Create a schema for the CSV file
const csvFileSchema = new Schema({
  filename: String,
  content: String,
});

export interface CsvFile extends Document {
  filename: string;
  content: string;
  _id: string;
}

// Create a model based on the schema
const CsvFile = model<CsvFile>('CsvFile', csvFileSchema);

export default CsvFile