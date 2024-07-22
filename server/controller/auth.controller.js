import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      console.log(error)
      // Duplicate key error
      const field = Object.keys(error.keyValue)[0];
      console.log(field)
      console.log(Object.keys(error.keyValue));
      return next(
        errorHandler(
          400,
          `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
        )
      );
    }
    next(errorHandler(500, error.message || "Something went wrong"));
  }
};
