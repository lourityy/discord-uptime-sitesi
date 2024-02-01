import { Document } from "mongoose";

export type Uptime = Document & {
    uptime_link: [string];
};