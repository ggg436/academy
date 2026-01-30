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
                name: "Sanjog Gharti Magar",
                role: "Full Stack Developer",
                image: "/man.svg",
                order: 1,
                socials: {
                    facebook: "https://facebook.com",
                    instagram: "https://instagram.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
            {
                name: "Aayush Khadka",
                role: "UI/UX Designer",
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
                name: "Samyog Tiwari",
                role: "Backend Engineer",
                image: "/man.svg",
                order: 3,
                socials: {
                    facebook: "https://facebook.com",
                    instagram: "https://instagram.com",
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                },
            },
            {
                name: "Sumit Adhikari",
                role: "Product Manager",
                image: "/man.svg",
                order: 4,
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
