import { db, Topic } from "@/app/api/db";
import TopicList from "./components/TopicList";
import ProgressBar from "@/app/progressbar";
import Link from "next/link";

async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const course = db.getById(Number(id));

	if (!course) return <p>Course not found.</p>;

	return (
		<div className="px-10">
			<div className="flex justify-between items-center mt-2 mb-4 gap-8 ">
				<h2
					className="cursor-default font-black text-4xl max-w-96 text-ellipsis capitalize overflow-hidden"
					title={`${course?.name}`}
				>
					{course?.name}
				</h2>
				<Link
					className="bg-purple-950 px-2 py-1 font-extralight rounded-lg text-[12px] text-white hover:bg-purple-800 hover:cursor-pointer hover:shadow-2xl hover:shadow-purple-950 active:bg-purple-600 active:scale-110"
					href={`/course/${id}/edit-course`}
				>
					Edit
				</Link>
			</div>

			<div className="w-2/3">
				<ProgressBar percentage={course?.progress} />
			</div>

			<article className="mt-8 mb-4">
				<h3 className="text-xl font-semibold mb-4">Topic(s)</h3>
				<TopicList
					courseId={course?.id}
					courseName={course?.name}
					topics={course?.topics}
				/>
			</article>
		</div>
	);
}

export default Page;
