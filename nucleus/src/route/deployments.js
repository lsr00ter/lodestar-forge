import express from "express";
import {
    allDeployments,
    configureDeployment,
    createDeployment,
    destroyDeployment,
    deployDeployment,
    prepareDeployment,
    deleteDeployment,
} from "../controller/deployments.js";
import { authenticatedOperator } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", allDeployments);
router.post("/", authenticatedOperator, createDeployment);
router.delete("/:deploymentId", authenticatedOperator, deleteDeployment);
router.post("/:deploymentId/destroy", authenticatedOperator, destroyDeployment);
router.post("/:deploymentId/prepare", authenticatedOperator, prepareDeployment);
router.post("/:deploymentId/deploy", authenticatedOperator, deployDeployment);
router.post(
    "/:deploymentId/configure",
    authenticatedOperator,
    configureDeployment,
);

export { router };
