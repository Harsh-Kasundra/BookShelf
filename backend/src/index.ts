import express from "express";
import rootRouter from "./routes/index";
import cors from "cors";

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/", rootRouter);

app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});
