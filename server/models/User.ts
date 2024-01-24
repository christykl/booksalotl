import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
  name: String,
  googleid: String,
  user_id: String,
});

export interface User extends Document {
  name: string;
  googleid: string;
  user_id: string;
  _id: string;
}

const UserModel = model<User>("User", UserSchema);

export default UserModel;
