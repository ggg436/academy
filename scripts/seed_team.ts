import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding team members...");

        // Delete existing team members
        console.log("Deleting existing team members...");
        await db.delete(schema.teamMembers);

        console.log("Inserting team members...");

        // Insert team members
        const teamData = [
            {
                name: "Sanjok Gharti",
                role: "CEO & FOUNDER",
                image: "/sanjok.png",
                order: 1,
                socials: {
                    facebook: "https://facebook.com",
                    instagram: "https://instagram.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
            {
                name: "Sangam Gharti",
                role: "COO",
                image: "/man.svg",
                order: 2,
                socials: {
                    facebook: "https://facebook.com",
                    instagram: "https://instagram.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
            {
                name: "Prabin K. Yadav",
                role: "CTO",
                image: "/prabin.png",
                order: 3,
                socials: {
                    facebook: "https://facebook.com",
                    instagram: "https://instagram.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
            {
                name: "Bal Krishna",
                role: "OPERATIONS MANAGER",
                image: "/man.svg",
                order: 4,
                socials: {
                    facebook: "https://facebook.com",
                    instagram: "https://instagram.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
            {
                name: "Abhishek Sah",
                role: "BACKEND DEVELOPER",
                image: "/man.svg",
                order: 5,
                socials: {
                    facebook: "https://facebook.com",
                    instagram: "https://instagram.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
            {
                name: "Sushant Sah",
                role: "FRONTEND DEVELOPER",
                image: "/man.svg",
                order: 6,
                socials: {
                    facebook: "https://facebook.com",
                    instagram: "https://instagram.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
        ];

        for (const member of teamData) {
            await db.insert(schema.teamMembers).values(member);
            console.log(`Inserted team member: ${member.name}`);
        }

        console.log("Team members seeding finished successfully!");
    } catch (error) {
        console.error("Seed error details:", error);
        throw new Error("Failed to seed team members");
    }
};

main();
