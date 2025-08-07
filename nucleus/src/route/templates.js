import express from "express";
import {
    allTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
} from "../controller/templates.js";
import { authenticatedOperator } from "../middleware/auth.js";

const router = express.Router();

router.get("/", allTemplates);
router.post("/", authenticatedOperator, createTemplate);
router.put("/:templateId", authenticatedOperator, updateTemplate);
router.delete("/:templateId", authenticatedOperator, deleteTemplate);

export { router };
