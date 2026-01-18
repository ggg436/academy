import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

import courseData from "../data/courses.json";
import challengeData from "../data/challenges.json";

const main = async () => {
    try {
        console.log("Seeding database...");

        // Delete existing data
        console.log("Deleting existing data...");
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userProgress);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challenges);
        await db.delete(schema.lessons);
        await db.delete(schema.units);
        await db.delete(schema.courses);

        console.log("Deleted data. Inserting courses...");

        // Insert Courses
        for (const course of courseData.courses) {
            console.log("Inserting course:", course.id);
            await db.insert(schema.courses).values({
                id: course.id,
                title: course.title,
                imageSrc: course.imageSrc,
            });

            // Insert Units
            for (const unit of course.units) {
                console.log("Inserting unit:", unit.id);
                await db.insert(schema.units).values({
                    id: unit.id,
                    title: unit.title,
                    description: `Learn the basics of ${course.title}`, // Description missing in JSON, stubbing
                    courseId: course.id,
                    order: unit.order,
                });

                // Insert Lessons
                for (const lesson of unit.lessons) {
                    console.log("Inserting lesson:", lesson.id);
                    await db.insert(schema.lessons).values({
                        id: lesson.id,
                        title: lesson.title,
                        unitId: unit.id,
                        order: lesson.order,
                    });
                }
            }
        }

        console.log("Inserted courses. Inserting challenges...");

        // Insert Challenges
        for (const challenge of challengeData.challenges) {
            // console.log("Inserting challenge:", challenge.id);
            await db.insert(schema.challenges).values({
                id: challenge.id,
                lessonId: challenge.lessonId,
                type: challenge.type as any,
                question: challenge.question,
                order: 1, // Order missing in JSON, defaulting to 1
            });

            // Insert Options
            for (const option of challenge.options) {
                await db.insert(schema.challengeOptions).values({
                    id: option.id,
                    challengeId: challenge.id,
                    text: option.text,
                    correct: option.correct,
                    imageSrc: (option as any).imageSrc,
                    audioSrc: (option as any).audioSrc,
                });
            }
        }

        console.log("Seeding finished");
    } catch (error) {
        console.error("Seed error details:", error);
        throw new Error("Failed to seed database");
    }
};

main();
