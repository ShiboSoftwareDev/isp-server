import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  firstName: text("firstName").notNull(),
  username: text("username").notNull(),
  lastName: text("lastName"),
  address: text("address").notNull(),
  state: text("state"),
  country: text("country").default("Libya").notNull(),
  city: text("city").notNull(),
  expirationDate: integer("expirationDate", { mode: "timestamp" })
    .default(new Date())
    .notNull(),
  email: text("email"),
  phone: integer("phone").notNull(),
  balance: integer("balance").default(0).notNull(),
  quota: integer("quota").default(0).notNull(),
  packageId: integer("packageId").references(() => packagesTable.id),
});

export const packagesTable = sqliteTable("packages", {
  id: integer("id").primaryKey(),
  packageName: text("name").notNull(),
  price: integer("price").notNull(),
  speed: integer("speed").notNull(),
  quota: integer("quota").notNull(),
  durationDays: integer("durationDays").notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPackage = typeof packagesTable.$inferInsert;
export type SelectPackage = typeof packagesTable.$inferSelect;
