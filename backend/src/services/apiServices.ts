import axios from "axios";

const data = {
    client_secret: process.env.CLIENT_SECRET,
    client_id: process.env.CLIENT_ID,
    token: process.env.CLIENT_TOKEN,
    redirect_uri: process.env.REDIRECT_URL,
};

const getAccessToken = (code: string) => {
    return axios({
        method: "post",
        url: "https://discord.com/api/v10/oauth2/token",
        data: {
            client_id: data.client_id,
            client_secret: data.client_secret,
            grant_type: "authorization_code",
            code,
            redirect_uri: data.redirect_uri,
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
};

const getUserGuilds = (token: string) => {
    return axios("https://discord.com/api/users/@me/guilds", {
        headers: { authorization: `Bearer ${token}` },
    });
};

const getBotGuilds = () => {
    return axios("https://discord.com/api/users/@me/guilds", {
        headers: { authorization: `Bot ${data.token}` },
    });
};

const getGuildUsers = () => {
    return axios(`https://discord.com/api/guilds/${process.env.GUILD_ID}/members`, {
        headers: { authorization: `Bot ${data.token}` },
    });
};

const getUserInfo = async (token: string) => {
    return await axios("https://discord.com/api/users/@me", {
        headers: { authorization: `Bearer ${token}` },
    });
};

export { getAccessToken, getUserGuilds, getBotGuilds, getGuildUsers, getUserInfo };
