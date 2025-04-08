import express from "express";
import {
  addHealthData,
  getHealthData,
} from "../controllers/healthDataController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addHealthData);
router.get("/", authMiddleware, getHealthData);

export default router;
