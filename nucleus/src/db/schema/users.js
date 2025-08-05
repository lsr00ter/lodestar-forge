import { timestamp, pgTable, text, pgEnum } from "drizzle-orm/pg-core";
import crypto from "crypto";

import { getTableColumns } from "drizzle-orm";

export const userRoleEnum = pgEnum("userRole", [
    "admin", // Full access to everything
    "operator", // Can manage projects, domains, and infrastructure. Cannot manager users or integrations.
    "readonly", // Can view projects, domains, and infrastructure. Cannot change / delete anything.
    "service",
]);

export const users = pgTable("users", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    password: text("password").notNull(),
    updated: timestamp("updated").defaultNow(),
    role: userRoleEnum("role").notNull().default("readonly"),
});

const { password, ...userSafeSelect } = getTableColumns(users);
export { userSafeSelect };
