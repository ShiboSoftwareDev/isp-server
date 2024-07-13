import { eq } from "drizzle-orm";
import { db } from "./index.js";
import {
  InsertPackage,
  InsertUser,
  packagesTable,
  SelectPackage,
  SelectUser,
  usersTable,
} from "./schema.js";
export async function getUser(): Promise<
  Array<{
    id: number;
    firstName: string;
    username: string;
    lastName: string | null;
    address: string;
    state: string | null;
    country: string;
    city: string;
    expirationDate: Date;
    email: string | null;
    phone: number;
    balance: number;
    quota: number;
    packageId: number | null;
  }>
> {
  return db.select().from(usersTable);
}
export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}
export async function getPackage(): Promise<
  Array<{
    id: number;
    quota: number;
    packageName: string;
    price: number;
    speed: number;
    durationDays: number;
  }>
> {
  return db.select().from(packagesTable);
}
export async function createPackage(data: InsertPackage) {
  await db.insert(packagesTable).values(data);
}

export async function deleteUser(id: SelectUser["id"]) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
}
export async function deletePackage(id: SelectPackage["id"]) {
  await db.delete(packagesTable).where(eq(packagesTable.id, id));
}
