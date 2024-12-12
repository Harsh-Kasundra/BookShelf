import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const bookRouter = express.Router();

// Get all books
bookRouter.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany({});
    res.status(200).json(books);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: "false",
      error: "Failed to retrieve records",
    });
  }
});

// Get a specific book by ID
bookRouter.get("/:id", async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findFirst({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: "false",
      error: "Failed to retrieve record",
    });
  }
});

// Create a new book
bookRouter.post("/", async (req: any, res: any) => {
  const { title, description, authorId } = req.body;

  if (!title || !authorId) {
    return res.status(400).json({
      success: "false",
      error: "Title and authorId are required",
    });
  }

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        description: description || null,
        authorId,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: "false",
      error: "Failed to create book",
    });
  }
});

// Update a book by ID
bookRouter.put("/:id", async (req: any, res: any) => {
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

    const updatedBook = await prisma.book.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        title: title || undefined,
        description: description || undefined,
      },
    });

    res.status(200).json(updatedBook);
  } catch (error: any) {
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
});

// Delete a book by ID
bookRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await prisma.book.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.status(200).json(deletedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: "false",
      error: "Failed to delete book",
    });
  }
});

export default bookRouter;
