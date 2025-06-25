import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Glas-Suile API! (in TypeScript)" });
});

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("FATAL ERROR: MONGO_URI is not defined in .env file");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB...");
    console.error(error);
    process.exit(1);
  }
};

startServer();
