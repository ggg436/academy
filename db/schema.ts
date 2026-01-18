import { relations } from "drizzle-orm";
import { pgTable, text, serial, integer, boolean, json, timestamp, primaryKey } from "drizzle-orm/pg-core";

// Team Members (Existing)
export const teamMembers = pgTable("team_members", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    image: text("image").notNull(),
    order: integer("order").notNull(),
    socials: json("socials").$type<{
        github?: string;
        linkedin?: string;
        facebook?: string;
        instagram?: string;
    }>().notNull().default({}),
});

// Courses
export const courses = pgTable("courses", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units),
    lessonProgress: many(lessonProgress),
}));

// Units
export const units = pgTable("units", {
    id: text("id").primaryKey(),
    title: text("title").notNull(), // e.g. "Unit 1"
    description: text("description").notNull(), // e.g. "Learn the basics"
    courseId: text("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ one, many }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

// Lessons
export const lessons = pgTable("lessons", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    unitId: text("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges),
    lessonProgress: many(lessonProgress),
}));

// Challenges
export const challengesEnum = ["SELECT", "ASSIST"] as const;

export const challenges = pgTable("challenges", {
    id: text("id").primaryKey(),
    lessonId: text("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
    type: text("type").notNull(), // SELECT, ASSIST
    question: text("question").notNull(),
    order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
}));

// Challenge Options
export const challengeOptions = pgTable("challenge_options", {
    id: text("id").primaryKey(),
    challengeId: text("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
    }),
}));

// User Progress
export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId: text("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
    streak: integer("streak").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}));

// User Settings
export const userSettings = pgTable("user_settings", {
    userId: text("user_id").primaryKey(),
    language: text("language").notNull().default("en"),
    soundEnabled: boolean("sound_enabled").notNull().default(true),
    darkMode: boolean("dark_mode").notNull().default(false),
    emailNotifications: boolean("email_notifications").notNull().default(true),
});

// Auth Tables

export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    username: text("username").unique(),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
});

export const accounts = pgTable(
    "accounts",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
);

export const sessions = pgTable("sessions", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

// Challenge Progress
export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(), // No FK to auth table since we removed it
    challengeId: text("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
    completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id],
    }),
}));

// Lesson Progress
export const lessonProgress = pgTable("lesson_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    courseId: text("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    lessonId: text("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
    completed: boolean("completed").notNull().default(true),
    completedAt: timestamp("completed_at", { mode: "date" }).defaultNow(),
});

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
    lesson: one(lessons, {
        fields: [lessonProgress.lessonId],
        references: [lessons.id],
    }),
    course: one(courses, {
        fields: [lessonProgress.courseId],
        references: [courses.id],
    }),
}));