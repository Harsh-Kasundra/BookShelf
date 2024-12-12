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
const bookRouter = express_1.default.Router();
// Get all books
bookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield prisma.book.findMany({});
        res.status(200).json(books);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: "false",
            error: "Failed to retrieve records",
        });
    }
}));
// Get a specific book by ID
bookRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield prisma.book.findFirst({
            where: {
                id: parseInt(id, 10),
            },
        });
        if (!book) {
            return res.status(404).json({
                success: "false",
                error: "Book not found",
            });
        }
        res.status(200).json(book);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: "false",
            error: "Failed to retrieve record",
        });
    }
}));
// Create a new book
bookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, authorId } = req.body;
    if (!title || !authorId) {
        return res.status(400).json({
            success: "false",
            error: "Title and authorId are required",
        });
    }
    try {
        const newBook = yield prisma.book.create({
            data: {
                title,
                description: description || null,
                authorId,
            },
        });
        res.status(201).json(newBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: "false",
            error: "Failed to create book",
        });
    }
}));
// Update a book by ID
bookRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        // Validate input
        if (!title && !description) {
            return res.status(400).json({
                success: "false",
                error: "At least one field (title or description) must be provided",
            });
        }
        const updatedBook = yield prisma.book.update({
            where: {
                id: parseInt(id, 10),
            },
            data: {
                title: title || undefined,
                description: description || undefined,
            },
        });
        res.status(200).json(updatedBook);
    }
    catch (error) {
        console.error(error);
        if (error.code === "P2025") {
            return res.status(404).json({
                success: "false",
                error: "Book not found",
            });
        }
        res.status(500).json({
            success: "false",
            error: "Failed to update the book",
        });
    }
}));
// Delete a book by ID
bookRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBook = yield prisma.book.delete({
            where: {
                id: parseInt(id, 10),
            },
        });
        res.status(200).json(deletedBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: "false",
            error: "Failed to delete book",
        });
    }
}));
exports.default = bookRouter;
