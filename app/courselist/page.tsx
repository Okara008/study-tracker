import ProgressBar from '../progressbar';
import Link from 'next/link'

async function courselist() {
	const response = await fetch("http://localhost:3000/api/courses")
	const data = await response.json()
		type Courses = {
        id: number;
        name: string;
        progress: number;
        topics: {
            name: string;
            isCompleted: boolean;
        }[];
    }

	return (
		<main className='p-5 pt-0'>
			<h2 className='mb-8 text-3xl font-black tracking-tight text-slate-900'>All Courses</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
				{data.map((course: Courses) => (
					<Link href={`/course/${course.id}`} key={course.id}>
						<div className='bg-purple-100 w-full shadow-2xs mb-5 rounded-2xl px-6 py-4 transition-all ease-linear active:bg-purple-200 hover:-translate-y-2 hover:shadow-lg hover:cursor-pointer '   style={{backgroundColor: (course.progress > 60 ? "rgba(0, 255, 0, .2)" : course.progress < 30 ?"rgba(255, 0, 0, .2)" : "")}}>
							<p className='font-bold text-2xl mb-2'>{course.name}</p>
							<ProgressBar percentage={course.progress} />
						</div>
					</Link>
				))}
			</div>
		</main>
	)
}

export default courselist