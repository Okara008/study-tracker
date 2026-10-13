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
		<main className='p-5 pt-0 mb-10'>
			<div className='flex justify-between items-center mb-8 mt-2'>
				<h2 className='text-3xl font-black tracking-tight text-slate-900'>All Courses</h2>
				<Link className='bg-purple-950 px-3 py-2 rounded-lg text-sm text-white hover:bg-purple-800 hover:cursor-pointer hover:shadow-2xl hover:shadow-purple-950 active:bg-purple-600 active:scale-110' href='/courselist/add-course'>
					New
				</Link>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
				{data.map((course: Courses) => (
					<Link href={`/course/${course.id}`} key={course.id}>
						<div className='bg-purple-100 w-full shadow-2xs mb-5 rounded-2xl px-6 py-4 transition-all ease-linear active:bg-purple-200 hover:-translate-y-2 hover:shadow-lg hover:cursor-pointer '   >
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