import { Document } from "mongoose";

export type Uptime = Document & {
    userId: string;
    project_name: [string];
    uptime_link: [string];
    version: Number;
};