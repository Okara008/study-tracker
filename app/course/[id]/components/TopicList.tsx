"use client";
import { Topic } from "@/app/api/db";
import toggleComplete from "./ToggleComplete";

type TopicListProps = {
	courseId: number;
	courseName: string;
	topics: Topic[];
};

function TopicList({ courseId, courseName, topics }: TopicListProps) {
	return (
		<div className="space-y-3">
			{topics?.map((topic: any, index: number) => (
				<div
					key={topic.name}
					className="flex items-center gap-4 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 shadow-sm"
				>
					<input
						className="h-4 w-4 accent-violet-600"
						type="checkbox"
						name={courseName}
						id={topic.name}
						checked={topic.isCompleted}
						onChange={async () => {
							await toggleComplete(courseId, topic.name);
						}}
					/>
					<label
						htmlFor={topic.name}
						className="flex-1 text-base font-medium text-slate-800"
					>
						{topic.name}
					</label>

					{topic.isCompleted ? (
						<button className="text-sm bg-purple-300 text-purple-950 px-3 py-1 rounded-lg font-medium">
							Completed
						</button>
					) : (
						<button className="text-sm border border-purple-950 text-purple-950 px-3 py-1 rounded-lg font-medium">
							Mark to Complete
						</button>
					)}
				</div>
			))}
		</div>
	);
}

export default TopicList;
