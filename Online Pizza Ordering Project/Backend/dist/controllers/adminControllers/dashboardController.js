"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeAdminGmail = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const changeAdminGmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldAdminGmail, newAdminGmail } = req.body;
        if (oldAdminGmail && newAdminGmail) {
            const configsFilePath = path_1.default.join(__dirname, "../../configuration/configs.json");
            const configsString = yield (0, fs_1.readFileSync)(configsFilePath, "utf8");
            const configsJson = JSON.parse(configsString);
            configsJson.adminGmail = newAdminGmail;
            yield (0, fs_1.writeFileSync)(configsFilePath, JSON.stringify(configsJson, null, 2));
            req.logout((err) => {
                if (err) {
                    throw new Error("Cannot able to logout");
                }
            });
            res.send({ status: "success" });
        }
        else {
            throw new Error("oldAdminGmail and newAdminGmail are required");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.changeAdminGmail = changeAdminGmail;
