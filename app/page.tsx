'use client'

import React from 'react'
import { useContext } from 'react'
import { CoursesContext } from '@/context/Courses'

const page = () => {

	const {courses, setCourses} = useContext(CoursesContext)

return (
	<main className='px-5 '>
		<h2 className='text-xl mb-4 font-bold'>Highlighted Courses</h2>

		<div className='flex flex-col gap-5'>
			{courses.slice(0, 4).map(course => (
				<article key={course.id} className="w-full rounded-3xl bg-purple-100 py-3 px-5">
					
					<p className='text-2xl font-bold text-purple-950 mb-2'>{course.name}</p>
					<p className='text-end text-base'> {course.progress}%</p>

				</article>
			))}
		</div>
	</main>
)
}

export default page