import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {

  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

app.listen(3000, () => console.log(`Server is running on port ${3000}`));
