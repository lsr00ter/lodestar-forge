import express from "express";
import {
    allFiles,
    createFile,
    deleteFile,
    updateFile,
} from "../controller/files.js";
import { authenticatedOperator } from "../middleware/auth.js";

const router = express.Router();

router.get("/", allFiles);
router.post("/", authenticatedOperator, createFile);
router.put("/:fileId", authenticatedOperator, updateFile);
router.delete("/:fileId", authenticatedOperator, deleteFile);

export { router };
