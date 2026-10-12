import Link from 'next/link'
import { Suspense } from 'react'
const page = async() => {

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

	let rands: number[] = []

	for(let i = 0; i < 4; i++){
		let rand: number
		do{
			rand = Math.floor(Math.random() * data.length)
		}while(rands.includes(rand))
			
		console.log(rand);
		rands.push(rand)
	}
	

	return (
		<Suspense fallback={<div>loading...</div>}>
			<main className='px-5 mb-4'>
				<h2 className='mb-8 text-3xl font-black tracking-tight text-slate-900'>Highlighted Courses</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
					{data.map((course:Courses, index:number) => {
						{if(rands.includes(index))
							return (
							<Link href={`/course/${course.id}`} key={course.id} className="flex items-center justify-between gap-3 w-full rounded-3xl bg-purple-100 py-3 px-5 hover:shadow-xl hover:bg-purple-50 active:bg-white md:h-20">
								<p className='text-2xl font-bold text-purple-950'>{course.name}</p>
								<div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-300 bg-white/70 text-sm font-semibold text-purple-900'>
									{course.progress.toFixed(0)}%
								</div>
							</Link>
						)}
					})}
				</div>

			</main>

		</Suspense>
	)
}

export default page