import { db } from "./index.js";
import {
  InsertPackage,
  InsertUser,
  packagesTable,
  usersTable,
} from "./schema.js";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}
export async function createPackage(data: InsertPackage) {
  await db.insert(packagesTable).values(data);
}
