'use client'

import React from 'react'
import { useContext } from 'react'
import { CoursesContext } from '@/context/Courses'
import Link from 'next/link'

const page = () => {

	const {courses, setCourses} = useContext(CoursesContext)

return (
	<main className='px-5 mb-4'>
		<h2 className='mb-8 text-3xl font-black tracking-tight text-slate-900'>Highlighted Courses</h2>

		<div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
			{courses.slice(0, 4).map(course => (
				<Link href={`/course/${course.id}`} key={course.id} className="flex items-center justify-between gap-3 w-full rounded-3xl bg-purple-100 py-3 px-5 hover:shadow-xl hover:bg-purple-50 active:bg-white md:h-20">
					<p className='text-2xl font-bold text-purple-950'>{course.name}</p>
					<div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-300 bg-white/70 text-sm font-semibold text-purple-900'>
						{course.progress.toFixed(0)}%
					</div>
				</Link>
			))}
		</div>
	</main>
)
}

export default page