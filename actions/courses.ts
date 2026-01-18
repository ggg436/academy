"use server";

import { db } from "@/db/drizzle";
import { courses, units, lessons, challenges, challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

export const getCourses = async () => {
    try {
        const data = await db.query.courses.findMany({
            with: {
                units: {
                    with: {
                        lessons: true
                    }
                }
            }
        });
        return data;
    } catch (error) {
        console.error("Failed to get courses", error);
        return [];
    }
};

export const getCourseById = async (courseId: string) => {
    try {
        const data = await db.query.courses.findFirst({
            where: eq(courses.id, courseId),
            with: {
                units: {
                    orderBy: (units, { asc }) => [asc(units.order)],
                    with: {
                        lessons: {
                            orderBy: (lessons, { asc }) => [asc(lessons.order)],
                        }
                    }
                }
            }
        });
        return data;
    } catch (error) {
        console.error("Failed to get course by id", error);
        return null;
    }
};
