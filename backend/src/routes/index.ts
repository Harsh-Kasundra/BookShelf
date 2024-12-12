import express from "express";
import bookRouter from "./book";
import authorRouter from "./author";

const router = express.Router();

router.use("/book", bookRouter);
router.use("/author", authorRouter);

export default router;
