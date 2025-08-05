import express from "express";
import {
    allIntegrations,
    createIntegration,
    deleteIntegration,
} from "../controller/integrations.js";
import { authenticatedAdminOrService } from "../middleware/auth.js";

const router = express.Router();

router.get("/", allIntegrations);
router.post("/", authenticatedAdminOrService, createIntegration);
router.delete("/:collectionId", authenticatedAdminOrService, deleteIntegration);

export { router };
