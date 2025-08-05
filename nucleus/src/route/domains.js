import express from "express";
import {
    allDomains,
    createDomain,
    deleteDomain,
    updateDomain,
} from "../controller/domains.js";
import { authenticatedOperator } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", allDomains);
router.post("/", authenticatedOperator, createDomain);
router.put("/:domainId", authenticatedOperator, updateDomain);
router.delete("/:domainId", authenticatedOperator, deleteDomain);

export { router };
