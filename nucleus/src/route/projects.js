import express from "express";
import {
    allProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../controller/projects.js";
import { checkProjectMiddleware } from "../middleware/project.js";
import { authenticatedOperator } from "../middleware/auth.js";

const router = express.Router();

router.get("/", allProjects);
router.post("/", authenticatedOperator, createProject);
router.put(
    "/:projectId",
    [authenticatedOperator, checkProjectMiddleware],
    updateProject,
);
router.delete(
    "/:projectId",
    [authenticatedOperator, checkProjectMiddleware],
    deleteProject,
);

export { router };
