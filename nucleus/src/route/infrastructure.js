import express from "express";
import {
    allInfrastructure,
    createInfrastructure,
    deleteInfrastructure,
    updateInfrastructure,
} from "../controller/infrastructure.js";
import { authenticatedOperator } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", allInfrastructure);
router.post("/", authenticatedOperator, createInfrastructure);
router.put("/:infrastructureId", authenticatedOperator, updateInfrastructure);
router.delete(
    "/:infrastructureId",
    authenticatedOperator,
    deleteInfrastructure,
);

export { router };
