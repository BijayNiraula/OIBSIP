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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRECT,
    callbackURL: `${process.env.BACKEND_BASE_URL}/authenticate/google/login`,
    scope: ["profile", "email"],
}, function (accessToken, refreshToken, profile, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const configsFilePath = path_1.default.join(__dirname, "./configs.json");
        const configsString = yield (0, fs_1.readFileSync)(configsFilePath, "utf8");
        const configsJson = JSON.parse(configsString);
        console.log(configsJson);
        console.log(profile);
        if (configsJson.adminGmail === profile.emails[0].value) {
            profile.userRole = "admin";
        }
        else {
            profile.userRole = "user";
        }
        callback(null, profile);
    });
}));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
