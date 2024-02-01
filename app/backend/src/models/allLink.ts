import { Schema, model } from "mongoose";
import { Uptime } from "../types/allLink";

const UptimeSchema: Schema<Uptime> = new Schema({
    uptime_link: { type: [String], required: true },
});

export const AllLink = model("allLink", UptimeSchema);