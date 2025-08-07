import express from "express";
import { allLogs, createLog } from "../controller/logs.js";
import { authenticatedOperator } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", allLogs);
router.post("/", authenticatedOperator, createLog);

export { router };
