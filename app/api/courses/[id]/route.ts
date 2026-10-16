import { db, type Topic } from "@/app/api/db";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
	const { id } = await params;
	const course = db.getById(Number(id));

	if (!course) {
		return Response.json({ error: "Course not found" }, { status: 404 });
	}

	return Response.json(course);
}

export async function PATCH(request: Request, { params }: RouteContext) {
	const { id } = await params;
	const courseId = Number(id);
	const currentCourse = db.getById(courseId);

	if (!currentCourse) {
		return Response.json({ error: "Course not found" }, { status: 404 });
	}

	const body = (await request.json()) as {
		name?: string;
		topics?: Topic[];
	};
	const topics = body.topics ?? currentCourse.topics;
	const completedTopics = topics.filter((topic) => topic.isCompleted).length;
	const progress = topics.length
		? Math.round((completedTopics / topics.length) * 100)
		: 0;
	const updatedCourse = db.update(courseId, {
		...(body.name !== undefined ? { name: body.name } : {}),
		topics,
		progress,
	});

	return Response.json(updatedCourse);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
	const { id } = await params;
	const courseId = Number(id);

	if (!db.getById(courseId)) {
		return Response.json({ error: "Course not found" }, { status: 404 });
	}

	db.remove(courseId);
	return new Response(null, { status: 204 });
}
