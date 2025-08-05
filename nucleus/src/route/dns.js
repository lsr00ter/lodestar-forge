import express from "express";
import {
    allRecords,
    createDnsRecord,
    deleteDnsRecord,
} from "../controller/dns.js";
import { authenticatedOperator } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", allRecords);
router.post("/", authenticatedOperator, createDnsRecord);
router.delete("/:dnsRecordId", authenticatedOperator, deleteDnsRecord);

export { router };
