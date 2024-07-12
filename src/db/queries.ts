import { db } from "./index.js";
import { InsertUser, usersTable } from "./schema.js";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}
