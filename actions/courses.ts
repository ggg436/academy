"use server";

import { db } from "@/db/drizzle";
import { courses, units, lessons, challenges, challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";
import courseData from "@/data/courses.json";

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
        
        // Fallback to JSON data if database is empty
        if (data.length === 0) {
            console.log("Database is empty, using fallback JSON data");
            return courseData.courses.map(course => ({
                id: course.id,
                title: course.title,
                imageSrc: course.imageSrc,
                units: course.units.map(unit => ({
                    id: unit.id,
                    title: unit.title,
                    description: `Learn the basics of ${course.title}`,
                    courseId: course.id,
                    order: unit.order,
                    lessons: unit.lessons.map(lesson => ({
                        id: lesson.id,
                        title: lesson.title,
                        unitId: unit.id,
                        order: lesson.order,
                    })),
                })),
            }));
        }
        
        return data;
    } catch (error) {
        console.error("Failed to get courses from database, using fallback JSON data", error);
        // Fallback to JSON data on error
        return courseData.courses.map(course => ({
            id: course.id,
            title: course.title,
            imageSrc: course.imageSrc,
            units: course.units.map(unit => ({
                id: unit.id,
                title: unit.title,
                description: `Learn the basics of ${course.title}`,
                courseId: course.id,
                order: unit.order,
                lessons: unit.lessons.map(lesson => ({
                    id: lesson.id,
                    title: lesson.title,
                    unitId: unit.id,
                    order: lesson.order,
                })),
            })),
        }));
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
        
        // Fallback to JSON data if not found in database
        if (!data) {
            console.log(`Course ${courseId} not found in database, using fallback JSON data`);
            const course = courseData.courses.find(c => c.id === courseId);
            if (course) {
                return {
                    id: course.id,
                    title: course.title,
                    imageSrc: course.imageSrc,
                    units: course.units
                        .sort((a, b) => a.order - b.order)
                        .map(unit => ({
                            id: unit.id,
                            title: unit.title,
                            description: `Learn the basics of ${course.title}`,
                            courseId: course.id,
                            order: unit.order,
                            lessons: unit.lessons
                                .sort((a, b) => a.order - b.order)
                                .map(lesson => ({
                                    id: lesson.id,
                                    title: lesson.title,
                                    unitId: unit.id,
                                    order: lesson.order,
                                })),
                        })),
                };
            }
        }
        
        return data;
    } catch (error) {
        console.error("Failed to get course by id, using fallback JSON data", error);
        // Fallback to JSON data on error
        const course = courseData.courses.find(c => c.id === courseId);
        if (course) {
            return {
                id: course.id,
                title: course.title,
                imageSrc: course.imageSrc,
                units: course.units
                    .sort((a, b) => a.order - b.order)
                    .map(unit => ({
                        id: unit.id,
                        title: unit.title,
                        description: `Learn the basics of ${course.title}`,
                        courseId: course.id,
                        order: unit.order,
                        lessons: unit.lessons
                            .sort((a, b) => a.order - b.order)
                            .map(lesson => ({
                                id: lesson.id,
                                title: lesson.title,
                                unitId: unit.id,
                                order: lesson.order,
                            })),
                    })),
            };
        }
        return null;
    }
};
