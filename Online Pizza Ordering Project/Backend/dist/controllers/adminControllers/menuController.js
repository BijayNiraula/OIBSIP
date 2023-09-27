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
exports.deleteMenuItem = exports.editMenuItem = exports.addMenuItem = exports.getMenuItems = void 0;
const menu_1 = __importDefault(require("../../db/models/menu"));
const getMenuItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItems = yield menu_1.default.find({});
        res.status(200).send({ status: "success", data: menuItems });
    }
    catch (err) {
        next(err);
    }
});
exports.getMenuItems = getMenuItems;
const addMenuItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pizzaName, size, type, price, description, stock } = req.body;
    try {
        const result = yield menu_1.default.create({ pizzaName, size, type, price, description, stock });
        res.status(200).send({ status: "success", data: result });
    }
    catch (err) {
        next(err);
    }
});
exports.addMenuItem = addMenuItem;
const editMenuItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pizzaName, size, type, price, description, _id, stock } = req.body;
    try {
        if (_id && pizzaName && size && type && price && description && stock) {
            const result = yield menu_1.default.updateOne({ _id }, { pizzaName, size, type, price, description, stock });
            res.status(200).send({ status: "success" });
        }
        else {
            throw new Error("please provide all the fields");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.editMenuItem = editMenuItem;
const deleteMenuItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        if (_id) {
            const result = yield menu_1.default.deleteOne({ _id });
            res.status(200).send({ status: "success" });
        }
        else {
            throw new Error("_id field should be provided");
        }
    }
    catch (err) {
        next(err);
    }
});
exports.deleteMenuItem = deleteMenuItem;
