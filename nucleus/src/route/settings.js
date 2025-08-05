import express from "express";
import { allSettings, updateSetting } from "../controller/settings.js";
import { authenticatedAdminOrService } from "../middleware/auth.js";

const router = express.Router();

router.get("/", allSettings);
router.post("/", authenticatedAdminOrService, updateSetting);

export { router };
