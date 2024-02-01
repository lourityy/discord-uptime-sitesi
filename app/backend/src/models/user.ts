import { Schema, model } from "mongoose";
import { User } from "../types/user";

const UserSchema: Schema<User> = new Schema({
    user_id: String,
    access_token: { type: String, default: null, required: false },
    links: Array
});

export const UserModel = model("users", UserSchema);