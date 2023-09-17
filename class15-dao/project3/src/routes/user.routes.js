import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.put("/:userId", updateUserById);
router.delete("/:userId", deleteUserById);

export default router;
