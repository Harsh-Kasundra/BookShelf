"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = __importDefault(require("./book"));
const author_1 = __importDefault(require("./author"));
const router = express_1.default.Router();
router.use("/book", book_1.default);
router.use("/author", author_1.default);
exports.default = router;
