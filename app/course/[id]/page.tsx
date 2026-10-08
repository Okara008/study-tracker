'use client'

import { use, useContext } from 'react'
import { CoursesContext } from '@/context/Courses'
import ProgressBar from '@/app/progressbar'

function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const { courses, setCourses } = useContext(CoursesContext)
    const course = courses.find(c => c.id === Number(resolvedParams.id))
    
    const toggleComplete = (isChecked: boolean, i: number) => {
        setCourses(prev => {
            const copy = [...prev];

            const courseIndex = copy.findIndex(
                c => c.id === Number(resolvedParams.id)
            );

            if (courseIndex === -1) {
                return prev;
            }

            const targetCourse = copy[courseIndex];
            const topics = [...targetCourse.topics];

            topics[i] = {
                ...topics[i],
                isCompleted: !topics[i].isCompleted
            };

            let progress = 0
            for (let i = 0; i < topics.length; i++) {
                const element = topics[i].isCompleted;
                if(element){
                    progress ++
                }
            }
            progress = ((progress / topics.length) * 100)

            copy[courseIndex] = {
                ...targetCourse,
                progress: progress,
                topics: topics
            };

            return copy;
        });
    };

    return (
    <div className='px-10'>
        <h2 className='font-black text-4xl mb-4'>{course?.name}</h2>
        <div className='w-2/3'>
            <ProgressBar percentage={course?.progress}/>
        </div>

        <article className='mt-8 mb-4'>
            <h3 className='text-xl font-semibold mb-4'>Topic(s)</h3>
            <div className='space-y-3'>
                {course?.topics.map((topic, index) => (
                    <div key={topic.name} className='flex items-center gap-4 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 shadow-sm' >
                        <input
                            className='h-4 w-4 accent-violet-600'
                            type='checkbox'
                            name={course.name}
                            id={topic.name}
                            checked={topic.isCompleted}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleComplete(Boolean(e.target.checked), index)}
                        />
                        <label htmlFor={topic.name} className='flex-1 text-base font-medium text-slate-800'>{topic.name}</label>

                        {topic.isCompleted ? (
                            <button className='text-sm bg-purple-300 text-purple-950 px-3 py-1 rounded-lg font-medium'>Completed</button>
                        ) : (
                            <button className='text-sm border border-purple-950 text-purple-950 px-3 py-1 rounded-lg font-medium'>Mark to Complete</button>
                        )}
                    </div>
                ))}
            </div>
        </article>
    </div>
    )
}

export default Page