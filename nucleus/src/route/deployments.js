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

const router = express.Router({ mergeParams: true });

router.get("/", allDeployments);
router.post("/", createDeployment);
router.delete("/:deploymentId", deleteDeployment);
router.post("/:deploymentId/destroy", destroyDeployment);
router.post("/:deploymentId/prepare", prepareDeployment);
router.post("/:deploymentId/deploy", deployDeployment);
router.post("/:deploymentId/configure", configureDeployment);

export { router };
