"use server";
import { redirect } from "next/navigation";
import { db, type Topic } from "@/app/api/db";

export async function editCourse(id: string, formData: FormData) {
	const courseId = Number(id);
	const currentCourse = db.getById(courseId);
	if (!currentCourse) throw new Error("Course not found");

	const nameValue = formData.get("name");
	const name = typeof nameValue === "string" ? nameValue : "";

	const topics: Topic[] = formData
		.getAll("topic")
		.filter((value): value is string => typeof value === "string")
		.map((name) => ({
			name,
			isCompleted:
				currentCourse.topics.find((topic) => topic.name === name)
					?.isCompleted ?? false,
		}));

	db.update(courseId, { name, topics });
	redirect(`/course/${courseId}`);
}
