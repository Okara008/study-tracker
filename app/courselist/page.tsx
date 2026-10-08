'use client'
import React from 'react'
import { useContext } from 'react'
import { CoursesContext } from '@/context/Courses'
import {useRouter} from 'next/navigation'
import ProgressBar from '../progressbar';
import Link from 'next/link'
function courselist() {
	const { courses } = useContext(CoursesContext)
	const router = useRouter()
return (
	<main className='p-5 pt-0'>
		<h2 className='mb-8 text-3xl font-black tracking-tight text-slate-900'>All Courses</h2>

		<div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
			{courses.map(course => (
				<Link href={`/course/${course.id}`} key={course.id}>
					<div className='bg-purple-100 w-full shadow-2xs mb-5 rounded-2xl px-6 py-4 transition-all ease-linear active:bg-purple-200 hover:-translate-y-2 hover:shadow-lg hover:cursor-pointer '  >
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