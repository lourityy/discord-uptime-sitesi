type Router = import("express").Router;

import { discord_get_user, get_user } from "./routes/user";
import { uptime_set, uptime_all, uptime_delete, all_link } from "./routes/uptime";

export default (router: Router) => {
    router.post("/get_user", get_user);
    router.post("/discord_get_user", discord_get_user);

    router.post("/uptime_set", uptime_set);
    router.post("/uptime_all", uptime_all);
    router.post("/uptime_delete", uptime_delete);
    router.get("/all_link", all_link);
};
