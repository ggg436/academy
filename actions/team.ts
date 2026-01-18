"use server";

import { db } from "@/db/drizzle";
import { teamMembers } from "@/db/schema";

export async function getTeamMembers() {
    const members = await db.select().from(teamMembers).orderBy(teamMembers.order);
    return members;
}
