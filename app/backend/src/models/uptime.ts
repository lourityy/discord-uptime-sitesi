import { Schema, model } from "mongoose";
import { Uptime } from "../types/uptime";

const UptimeSchema: Schema<Uptime> = new Schema({
    userId: { type: String, required: true },
    project_name: { type: [String], required: true },
    uptime_link: { type: [String], required: true },
    version: { type: Number, default: 0, },
});

export const UptimeModel = model("uptimes", UptimeSchema);