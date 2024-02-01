import { Document } from "mongoose";

export type User = Document & {
    user_id: string;
    access_token: string;
    links: []
};
