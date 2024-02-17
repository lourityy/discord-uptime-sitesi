type Client = import("discord.js").Client;
import { server } from "../../main";
import axios from "axios";

export default (client: Client) => {
    client?.once("ready", () => {
        server.console(
            "success",
            `Discord bot named ${client.user?.username}#${client.user?.discriminator} worked successfully`
        );

        setInterval(async () => {
            const response = await axios.get<{ uptimeLinks: { uptime_link: string }[] }>(`${process.env.API_URL}/all_link`);
            
            if (!response.data.uptimeLinks) return;
            const sonuc = response.data.uptimeLinks.map((item) => item.uptime_link);

            sonuc.forEach((link) => {
                fetch(link).catch(l => { });
            });

            console.log("[BAŞARILI]" + " " + "Başarıyla linkleri uptime etmeye başladım");
        }, 5000);
    });
};
