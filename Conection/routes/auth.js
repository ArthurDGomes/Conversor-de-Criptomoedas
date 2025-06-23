import express from "express";
import { registerUser, loginUser } from "../Controllers/authController.js";

const router = express.Router();

// Rota de registro
router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
