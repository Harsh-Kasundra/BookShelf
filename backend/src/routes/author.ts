import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const authorRouter = express.Router();

authorRouter.get("/", async (req, res) => {
  try {
    const authors = await prisma.author.findMany({});
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve author",
    });
  }
});

authorRouter.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.json({
      success: false,
      error: "Author name is required",
    });
  }
  try {
    const author = await prisma.author.create({
      data: {
        name: name,
      },
    });
    res.status(201).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed create new author",
    });
  }
});

authorRouter.put("/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    res.status(500).json({
      success: false,
      error: "Name is required",
    });
  }
  try {
    const author = await prisma.author.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
      },
    });
    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to update the author",
    });
  }
});

authorRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const author = await prisma.author.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to delete the author",
    });
  }
});

export default authorRouter;
