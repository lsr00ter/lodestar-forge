import express from "express";
import {
    allSshKeys,
    createSshKey,
    deleteSshKey,
} from "../controller/sshKeys.js";
import { authenticatedOperator } from "../middleware/auth.js";

const router = express.Router();

router.get("/", allSshKeys);
router.post("/", authenticatedOperator, createSshKey);
router.delete("/:sshKeyId", authenticatedOperator, deleteSshKey);

export { router };
