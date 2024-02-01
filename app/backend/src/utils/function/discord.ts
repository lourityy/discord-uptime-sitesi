import { Client, GatewayIntentBits } from "discord.js";
import console from "./console";

interface DiscordOptions {
    token: string;
}

export default (options: DiscordOptions) => {
    const intents: any = Object.values(GatewayIntentBits);
    const client = new Client({ intents });

    if (options.token) {
        client.login(options.token);
    } else {
        console("reject", "Discord token could not be entered");
    }

    return client;
};
