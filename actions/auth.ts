"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const register = async (values: any) => {
    const { email, password, firstName, lastName } = values;

    if (!email || !password || !firstName || !lastName) {
        return { error: "Missing fields" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const name = `${firstName} ${lastName}`;

    // Generate base username
    const baseUsername = `${firstName}${lastName}`.toLowerCase().replace(/[^a-z0-9]/g, "");
    let username = baseUsername;
    let counter = 1;

    // Ensure uniqueness
    while (true) {
        const existingUsername = await db.query.users.findFirst({
            where: eq(users.username, username),
        });

        if (!existingUsername) break;

        username = `${baseUsername}${counter}`;
        counter++;
    }

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (existingUser) {
        return { error: "Email already in use" };
    }

    await db.insert(users).values({
        email,
        name,
        username,
        password: hashedPassword,
        image: "/mascot.svg",
    });

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        return { success: "User created!" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong" };
            }
        }
        return { error: "Something went wrong" };
    }
};

export const login = async (values: any) => {
    const { email, password } = values;

    if (!email || !password) {
        return { error: "Missing fields" };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong" };
            }
        }
        return { error: "Something went wrong" };
    }
}

export const loginAsGuest = async () => {
    // Guest mode - just return success, the app already allows guest access
    // based on auth.config.ts returning true for all routes
    return { success: true };
}


export const logout = async () => {
    await signOut({ redirectTo: "/" });
};
