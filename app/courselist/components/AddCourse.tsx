"use server";
import { redirect } from "next/navigation";
import { db, Topic } from "@/app/api/db";
export async function addCourse(formData: FormData) {
	const nameValue = formData.get("name");
	const name: string = typeof nameValue === "string" ? nameValue : "";

	const topics: Topic[] = formData
		.getAll("topic")
		.filter((value): value is string => typeof value === "string")
		.map((name) => ({ name, isCompleted: false }));

	let data = {
		name: name,
		progress: 0,
		topics: topics,
	};
	let new_data = db.add(data);

	redirect(`/course/${new_data.id}`);
}
