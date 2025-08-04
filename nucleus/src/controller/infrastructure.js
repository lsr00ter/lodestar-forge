import { db } from "../db/index.js";
import { infrastructure } from "../db/schema/infrastructure.js";
import { eq, and, inArray } from "drizzle-orm";
import { templates } from "../db/schema/templates.js";
import fs from "fs";
import path from "path";
import { deployments } from "../db/schema/deployments.js";
import { resources } from "../db/schema/resources.js";

export const allInfrastructure = async (req, res) => {
    const { deploymentId } = req.params;

    if (!deploymentId) {
        return res
            .status(400)
            .json({ error: "error 'deploymentId' is required" });
    }

    const rows = await db
        .select()
        .from(infrastructure)
        .where(eq(infrastructure.deploymentId, deploymentId));

    return res.status(200).json(rows);
};

export const updateInfrastructure = async (req, res) => {
    const { infrastructureId } = req.params;
    const { name, description, configurations } = req.body;
    let domain = null;

    if (name && name === "") {
        return res.status(400).json({ error: "'name' cannot be blank." });
    }

    configurations.forEach((config) => {
        config.variables.forEach((variable) => {
            if (variable.type === "infrastructure-id") {
                variable.value = infrastructureId;
            }

            if (variable.type === "file" && Array.isArray(variable.variables)) {
                variable.variables.forEach((nestedVar) => {
                    if (nestedVar.type === "infrastructure-id") {
                        nestedVar.value = infrastructureId;
                    }

                    if (nestedVar.type === "domain") {
                        domain = nestedVar.value;
                    }
                });
            }

            if (variable.type === "domain") {
                domain = variable.value;
            }
        });
    });

    await db
        .update(resources)
        .set({ domain })
        .where(
            and(
                eq(resources.infrastructureId, infrastructureId),
                inArray(resources.resourceType, [
                    "aws_instance",
                    "digitalocean_droplet",
                ]),
            ),
        );

    const updatedRow = await db
        .update(infrastructure)
        .set({ name, description, configurations })
        .where(eq(infrastructure.id, infrastructureId))
        .returning();

    return res.status(200).json(updatedRow);
};

export const createInfrastructure = async (req, res) => {
    try {
        const { deploymentId } = req.params;

        // If deployment Id not provided, error
        if (!deploymentId) {
            return res
                .status(400)
                .json({ error: "error 'deploymentId' is required" });
        }

        // TODO: Check these
        const { name, infrastructureTemplateId, description, variables } =
            req.body;

        // Invalid name
        if (!name) {
            return res.status(400).json({ error: "error 'name' is required" });
        }

        // Invalid template ID
        if (!infrastructureTemplateId) {
            return res.status(400).json({
                error: "error 'infrastructureTemplateId' is required",
            });
        }

        // If variables are invalid
        if (
            variables.length &&
            !variables.every((variable) => {
                if (variable.type !== "infrastructure-id")
                    return (
                        variable.name && variable.value && variable.value !== ""
                    );
                return true;
            })
        ) {
            return res
                .status(400)
                .json({ error: "error 'variables' is invalid" });
        }

        // Get deployment
        const [deployment] = await db
            .select({
                tailscaleId: deployments.tailscaleId,
                region: deployments.region,
            })
            .from(deployments)
            .where(eq(deployments.id, deploymentId));

        // Get template
        const [template] = await db
            .select()
            .from(templates)
            .where(eq(templates.id, infrastructureTemplateId));

        // TODO: Check variables in template match variables provided

        const [tempInfrastructure] = await db
            .insert(infrastructure)
            .values({
                deploymentId,
                name,
                description,
            })
            .returning();

        const updatedVariables = variables.map((v) => {
            if (v.type === "infrastructure-id") {
                return { ...v, value: tempInfrastructure.id };
            }
            return v;
        });

        const [newInfrastructure] = await db
            .update(infrastructure)
            .set({ template: { id: template.id, variables: updatedVariables } })
            .where(eq(infrastructure.id, tempInfrastructure.id));

        return res.status(200).json(newInfrastructure);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteInfrastructure = async (req, res) => {
    const { deploymentId, infrastructureId } = req.params;

    const deploymentDir = path.join("/app/deployments", deploymentId);
    const terraformDir = path.join(deploymentDir, "terraform");

    if (fs.existsSync(path.join(terraformDir, `${infrastructureId}.tf`))) {
        fs.rmSync(path.join(terraformDir, `${infrastructureId}.tf`));
    }

    await db
        .delete(infrastructure)
        .where(eq(infrastructure.id, infrastructureId));

    return res
        .status(200)
        .json({ message: "Infrastructure deleted successfully" });
};
