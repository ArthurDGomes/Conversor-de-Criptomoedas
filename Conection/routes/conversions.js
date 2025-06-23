import express from "express";
import { convertCrypto, getConversionHistory } from "../controllers/conversionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, convertCrypto);
router.get("/", authMiddleware, getConversionHistory);

export default router;
