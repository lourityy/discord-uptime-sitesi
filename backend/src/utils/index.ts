type Application = import("express").Application;

import { EventEmitter } from "stream";

import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Client } from "discord.js";
import { connect } from "mongoose";

import functionConsole from "./function/console";
import functionDiscord from "./function/discord";
import functionKeyToken from "./function/key/token";
import functionKeyId from "./function/key/id";

interface ServerOptions {
    databaseUrl?: string;
    logger?: {
        success: string;
        reject: string;
        regular: string;
    };
    api?: {
        port: number;
        baseUrl: string;
    };
    discord?: {
        token: string;
    };
}

interface ServerOptionsLogger {
    success: string;
    reject: string;
    regular: string;
}

export class Server extends EventEmitter {
    private Logger: ServerOptions["logger"];

    app?: Application;
    router?: Router;
    discord?: Client;

    constructor(options: ServerOptions) {
        super();

        this.Logger = options.logger;
        this.app = express();
        this.router = Router();

        if (options.databaseUrl)
            this.databaseConnectPrivate(options.databaseUrl as string);
        if (options.discord?.token) this.discordPrivate(options.discord);
        if (options.api?.port) this.listenServerPrivate(options.api);
    }

    console(state: keyof ServerOptionsLogger, text: string) {
        functionConsole(
            this.Logger ? this.Logger[state] : "reject",
            text as string
        );
    }
    async tokenGenerate() {
        return await functionKeyToken();
    }
    async idGenerate() {
        return await functionKeyId();
    }

    private discordPrivate(options: ServerOptions["discord"]) {
        if (options) this.discord = functionDiscord(options);
    }

    private async databaseConnectPrivate(databaseUrl: string) {
        await connect(databaseUrl as string).then(() => this.emit("database"));
    }

    private listenServerPrivate(options: ServerOptions["api"]) {
        this.app?.use(options?.baseUrl as string, this.router as Router);
        /* App */
        this.app?.use(bodyParser.json());
        this.app?.use(cors());
        /* Router */
        this.router?.use(bodyParser.json());
        this.router?.use(cors());

        this.app?.listen(options?.port, () => this.emit("listen"));
    }
}
