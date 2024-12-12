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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authorRouter = express_1.default.Router();
authorRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield prisma.author.findMany({});
        res.json(authors);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve author",
        });
    }
}));
authorRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.json({
            success: false,
            error: "Author name is required",
        });
    }
    try {
        const author = yield prisma.author.create({
            data: {
                name: name,
            },
        });
        res.status(201).json(author);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Failed create new author",
        });
    }
}));
authorRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
        res.status(500).json({
            success: false,
            error: "Name is required",
        });
    }
    try {
        const author = yield prisma.author.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: name,
            },
        });
        res.json(author);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Failed to update the author",
        });
    }
}));
authorRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const author = yield prisma.author.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json(author);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Failed to delete the author",
        });
    }
}));
exports.default = authorRouter;
