export interface Course {
	id: number;
	name: string;
	progress: number;
	topics: Topic[];
}
export interface Topic {
	name: string;
	isCompleted: boolean;
}

const globalForDb = globalThis as unknown as { courses?: Course[] };

if (!globalForDb.courses) {
	globalForDb.courses = [
		{
			id: 1,
			name: "React",
			progress: 50,
			topics: [
				{ name: "JSX", isCompleted: true },
				{ name: "Components", isCompleted: true },
				{ name: "Props", isCompleted: true },
				{ name: "State", isCompleted: false },
				{ name: "Hooks", isCompleted: false },
				{ name: "Context", isCompleted: false },
			],
		},
		{
			id: 2,
			name: "TypeScript",
			progress: 67,
			topics: [
				{ name: "Types", isCompleted: true },
				{ name: "Interfaces", isCompleted: false },
				{ name: "Type aliases", isCompleted: true },
				{ name: "Unions", isCompleted: false },
				{ name: "Generics", isCompleted: false },
				{ name: "Narrowing", isCompleted: true },
			],
		},
		{
			id: 3,
			name: "Next.js",
			progress: 33,
			topics: [
				{ name: "Routing", isCompleted: false },
				{ name: "Layouts", isCompleted: true },
				{ name: "Pages", isCompleted: false },
				{ name: "Server components", isCompleted: false },
				{ name: "Data fetching", isCompleted: true },
				{ name: "Metadata", isCompleted: false },
			],
		},
		{
			id: 4,
			name: "CSS",
			progress: 100,
			topics: [
				{ name: "Flexbox", isCompleted: true },
				{ name: "Grid", isCompleted: true },
				{ name: "Responsive design", isCompleted: true },
				{ name: "Selectors", isCompleted: true },
				{ name: "Custom properties", isCompleted: true },
				{ name: "Animations", isCompleted: true },
			],
		},
		{
			id: 5,
			name: "Node.js",
			progress: 0,
			topics: [
				{ name: "Modules", isCompleted: false },
				{ name: "APIs", isCompleted: false },
				{ name: "File system", isCompleted: false },
				{ name: "Events", isCompleted: false },
				{ name: "Streams", isCompleted: false },
				{ name: "Error handling", isCompleted: false },
			],
		},
		{
			id: 6,
			name: "JavaScript",
			progress: 50,
			topics: [
				{ name: "Variables", isCompleted: true },
				{ name: "Functions", isCompleted: true },
				{ name: "Arrays", isCompleted: false },
				{ name: "Objects", isCompleted: true },
				{ name: "Promises", isCompleted: false },
				{ name: "Async/await", isCompleted: false },
			],
		},
		{
			id: 7,
			name: "HTML",
			progress: 67,
			topics: [
				{ name: "Document structure", isCompleted: true },
				{ name: "Semantic elements", isCompleted: true },
				{ name: "Forms", isCompleted: true },
				{ name: "Tables", isCompleted: false },
				{ name: "Accessibility", isCompleted: true },
				{ name: "Media elements", isCompleted: false },
			],
		},
		{
			id: 8,
			name: "Git",
			progress: 50,
			topics: [
				{ name: "Repositories", isCompleted: true },
				{ name: "Commits", isCompleted: false },
				{ name: "Branches", isCompleted: true },
				{ name: "Merging", isCompleted: false },
				{ name: "Remotes", isCompleted: false },
				{ name: "Rebasing", isCompleted: false },
			],
		},
		{
			id: 9,
			name: "Python",
			progress: 83.33,
			topics: [
				{ name: "Syntax", isCompleted: true },
				{ name: "Data structures", isCompleted: true },
				{ name: "Functions", isCompleted: true },
				{ name: "Modules", isCompleted: true },
				{ name: "Classes", isCompleted: false },
				{ name: "Exceptions", isCompleted: true },
			],
		},
		{
			id: 10,
			name: "SQL",
			progress: 17,
			topics: [
				{ name: "SELECT queries", isCompleted: true },
				{ name: "Filtering", isCompleted: false },
				{ name: "Joins", isCompleted: false },
				{ name: "Aggregations", isCompleted: false },
				{ name: "Subqueries", isCompleted: false },
				{ name: "Indexes", isCompleted: false },
			],
		},
	];
}

const store = globalForDb as { courses: Course[] };

export const db = {
	getAll: () => store.courses,

	getById: (id: number) => store.courses.find((c) => c.id === id),

	add: (data: Omit<Course, "id" | "topics"> & { topics?: Topic[] }) => {
		const course: Course = {
			id: Date.now(),
			name: data.name,
			progress: data.progress,
			topics: data.topics ?? [],
		};
		store.courses.push(course);

		return course;
	},

	update: (id: number, data: Partial<Omit<Course, "id">>) => {
		store.courses = store.courses.map((c) =>
			c.id === id ? { ...c, ...data } : c,
		);
		return store.courses.find((c) => c.id === id);
	},

	remove: (id: number) => {
		store.courses = store.courses.filter((c) => c.id !== id);
	},

	toggleTopic: (courseId: number, topicName: string) => {
		store.courses = store.courses.map((c) => {
			if (c.id !== courseId) return c;
			const topics = c.topics.map((t) =>
				t.name === topicName
					? { ...t, isCompleted: !t.isCompleted }
					: t,
			);
			const done = topics.filter((t) => t.isCompleted).length;
			const progress = topics.length
				? Math.round((done / topics.length) * 100)
				: 0;
			return { ...c, topics, progress };
		});
		return store.courses.find((c) => c.id === courseId);
	},
};
