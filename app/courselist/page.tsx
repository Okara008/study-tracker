'use client'
import React from 'react'
import { useContext, useState } from 'react'
import { CoursesContext } from '@/context/Courses'
import {useRouter} from 'next/navigation'
import ProgressBar from '../progressbar';
import Link from 'next/link'


function courselist() {
	const { courses } = useContext(CoursesContext)
	const [ searchValue, setSearchValue ] = useState("")
	const router = useRouter()
return (
	<main className='p-5 pt-0'>
		<h2 className='mb-8 text-3xl font-black tracking-tight text-slate-900'>All Courses</h2>

		<div className='relative mb-6 max-w-xl mx-auto'>
			<input className='w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-12 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 mx-auto block focus:ring-2 focus:ring-purple-200' type="text" placeholder='Search courses...' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}/>
			<button className='absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500' type='button' aria-label='Search'>
				<svg className='h-5 w-5 active:h-6 active:w-6 transition-all ease-linear' aria-hidden='true' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
					<circle cx='11' cy='11' r='7' />
					<path strokeLinecap='round' d='m20 20-4-4' />
				</svg>
			</button>
		</div>

		<div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
			{courses.map(course => (
				<Link href={`/course/${course.id}`} key={course.id}>
					<div className='bg-purple-100 w-full shadow-2xs mb-5 rounded-2xl px-6 py-4 transition-all ease-linear active:bg-purple-200 hover:-translate-y-2 hover:shadow-lg hover:cursor-pointer hover:-z-1'  >
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