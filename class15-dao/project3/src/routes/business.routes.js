import { Router } from "express";
import {
  createBussiness,
  deleteBussinessById,
  getBussines,
  getBussinessById,
  updateBussinesById,
} from "../controllers/business.controller.js";

const router = Router();

router.get("/", getBussines);
router.get("/:bussinessId", getBussinessById);
router.post("/", createBussiness);
router.put("/:bussinessOrder", updateBussinesById);
router.delete("/:bussinessId", deleteBussinessById);

export default router;
