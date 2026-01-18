
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const main = async () => {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql, { schema });
        console.log("Seeding guest user...");

        await db.insert(schema.users).values({
            id: "guest",
            name: "Guest User",
            email: "guest@example.com",
            image: "/mascot.svg",
        }).onConflictDoNothing();

        console.log("Guest user seeded.");
    } catch (e) {
        console.error("Error seeding guest:", e);
    }
}
main();
