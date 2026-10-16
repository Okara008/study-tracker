"use server";
import { db } from "@/app/api/db";
import { revalidatePath } from "next/cache";

async function toggleComplete(courseId: number, name: string) {
    db.toggleTopic(courseId, name)
    revalidatePath(`/course/${courseId}`);
    
}

export default toggleComplete;
