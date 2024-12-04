import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"] },
  active: { type: Boolean, default: false },
  token: { type: String, default: null },
});

const UserModel = mongoose.model(userCollection, userSchema);
export default UserModel;
