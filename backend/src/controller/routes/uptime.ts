type Request = import("express").Request;
type Response = import("express").Response;
import { UserModel } from "../../models/user";

export const uptime_set = async (req: Request, res: Response) => {
    try {
        const body: { uptime_link: string, userId: string, uptime_name: string } = req.body;
        if (!body) return res.status(506).json({ success: false, message: "body is not found" });
        const ProjectLimit = parseInt(`${process.env.PROJECT_ADD_LIMIT}`, 10);

        const user = await UserModel.findOne({ user_id: body.userId })

        if (user?.links.length as number > ProjectLimit) return res.send({ message: "project_limit" })

        if (user?.links.some((cmd: { uptime_link: string, uptime_name: string }) => cmd.uptime_link == body.uptime_link)) return res.send({ message: "link_error" })

        await UserModel.updateOne({
            user_id: body.userId
        }, {
            $push: {
                links: {
                    project_name: body.uptime_name,
                    uptime_link: body.uptime_link
                }
            }
        }, {
            upsert: true
        })

        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err)
    }
};

export const uptime_all = async (req: Request, res: Response) => {
    const body: { userId: string } = req.body;
    if (!body) return res.status(506).json({ success: false, message: "body is not found" });
    const user = await UserModel.findOne({ user_id: body.userId })

    //@ts-ignore
    if (!(user || user?.links.length !== 0)) return res.status(506).json({ success: false, message: "user is not found" })

    res.json({
        success: true,
        data: user?.links
    })
};

export const uptime_delete = async (req: Request, res: Response) => {
    const body: { link: string, userId: string } = req.body
    if (!body) return res.status(506).json({ success: false, message: "body is not found please entered body" })

    await UserModel.findOneAndUpdate({
        user_id: body.userId
    }, {
        $pull: {
            links: {
                uptime_link: body.link
            }
        }
    }, {
        upsert: true
    })

    res.json({ success: true })
};

export const all_link = async (req: Request, res: Response) => {
    const users = await UserModel.find();

    const uptimeLinks = users.reduce((acc, user) => {
        if (user.links && Array.isArray(user.links)) {
            const uptimeLinksForUser = user.links
                //@ts-ignore
                .filter(link => link.project_name)
                //@ts-ignore
                .map(link => ({ uptime_link: link.uptime_link }));
            //@ts-ignore
            acc.push(...uptimeLinksForUser);
        }
        return acc;
    }, []);

    res.status(200).json({ uptimeLinks });
}