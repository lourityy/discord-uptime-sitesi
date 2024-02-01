type Request = import("express").Request;
type Response = import("express").Response;

import { getAccessToken, getUserInfo } from "../../services/apiServices";

import { Client, GuildMember, IntentsBitField, Partials } from "discord.js";
import { UserModel } from "../../models/user";

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildPresences
    ],
    partials: [Partials.GuildMember, Partials.User],
    rest: { offset: 0, timeout: 5000 },
    ws: { large_threshold: 250 }
});

let users: GuildMember[] | undefined = [];

bot.once("ready", async (client) => {
    setInterval(() => {
        const guild = client.guilds.cache.get(`${process.env.GUILD_ID}`);
        const members = guild?.members.cache.toJSON();

        users = members;
    }, 5000)
});

bot.login(`${process.env.CLIENT_TOKEN}`);

export const get_user = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        if (!body || !body?.token) return res.send({ code: 506, success: false });

        if (body.type == "discord") {
            const userInfo = await getUserInfo(body.token).catch((e) => e);

            res.send({ code: 101, success: true, data: userInfo.data });
        }
    } catch (err) {
        return;
    }
};

export const discord_get_user = async (req: Request, res: Response) => {
    try {
        const code = req.body.code;
        if (!code) return res.send({ code: 406, success: false });

        const response = await getAccessToken(code);

        if (!response?.status || !response.data?.access_token)
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });

        const userInfo = await getUserInfo(response.data.access_token).catch((e) => e);
        const user_id = userInfo.data.id;

        await UserModel.updateOne(
            { access_token: response.data.access_token },
            { upsert: true },
        ).then(() => {
            res.json({ code: 101, success: true, access_token: response.data.access_token, user_id });
        });
    } catch (err) {
        console.log(err)
    }
};
