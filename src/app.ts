import express from "express";
import menuRoutes from "./routes/menuRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

// Register routes
app.use("/api/pizza-fusion/menu", menuRoutes);

export default app;
