import { Client } from "discord.js";
import { Server } from "./utils/index";
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

import controller from "./controller";
import discord from "./bot/discord";

export const server = new Server({
    databaseUrl: process.env.DATABASE,
    api: {
        port: 5000,
        baseUrl: "/api",
    },
    discord: {
        token: `${process.env.CLIENT_TOKEN}`,
    },
    logger: {
        success: "#14f00c",
        reject: "#e81010",
        regular: "#d1cb0d",
    },
});

discord(server.discord as Client);

server.once("listen", () => {
    server.console("success", "API worked successfully");
    controller(server.router as Router);
});

server.once("database", () => {
    server.console("success", "I have successfully connected to the database");
});
