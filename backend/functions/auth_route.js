import express from "express";
import authController from '../authController.js';

const router = express.Router();


router.get("/google", authController);


export default router