import { NextFunction, Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

export const changeAdminGmail = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { oldAdminGmail, newAdminGmail } = req.body;
        if (oldAdminGmail && newAdminGmail) {
            const configsFilePath = path.join(__dirname, "../../configuration/configs.json");
            const configsString = await readFileSync(configsFilePath, "utf8");
            const configsJson = JSON.parse(configsString);
            configsJson.adminGmail = newAdminGmail;
            await writeFileSync(configsFilePath, JSON.stringify(configsJson, null, 2));
            req.logout((err: Error) => {
                if (err) {
                    throw new Error("Cannot able to logout")
                }
            })
            res.send({ status: "success" });
        } else {
            throw new Error("oldAdminGmail and newAdminGmail are required");
        }
    } catch (err) {
        next(err);
    }
}