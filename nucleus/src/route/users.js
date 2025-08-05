import express from "express";
import { addUser, allUsers, deleteUser } from "../controller/users.js";
import { authenticatedAdminOrService } from "../middleware/auth.js";

const router = express.Router();

router.get("/", allUsers);
router.post("/", authenticatedAdminOrService, addUser);
router.delete("/:userId", authenticatedAdminOrService, deleteUser);

export { router };
