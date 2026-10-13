'use client'
import { useRef, useState } from 'react'
function page() {
    const [topicValues, setTopicValues] = useState<string[]>([""])

    const addTopic = () => {
        setTopicValues(prev => {
            let copy = [...prev]
            copy.push("")
            console.log(copy);
            
            return copy
        })
    }
    
    const deleteTopic = (index:number) => {
        setTopicValues(prev => {
            if (prev.length <= 1) return prev

            const copy = [...prev]
            copy.splice(index, 1)
            return copy
        })
    }

    const updateTopicValues = (index:number, value:string) => {
        setTopicValues((prev) => {
            const copy = [...prev]
            copy[index] = value
            return copy
        })
    }

    return (
        <div className='px-5'>
            <h2 className='text-3xl mb-8 mt-2 font-black tracking-tight text-slate-900'>Add New Course</h2>
            
            <form >
                <div className='mb-6'>
                    <label htmlFor="name" className='text-lg font-bold leading-3'>Course Title</label><br />
                    <input required type="text" name="name" id="name" className='bg-purple-200 w-full px-3 py-2 rounded-md'/>
                </div>

                <div className='mb-6'>
                    <div className='flex items-center justify-between mb-1'>
                        <label htmlFor="topic"  className='text-lg font-bold leading-3'>Topic(s)</label><br />
                        <button type='button' className='bg-purple-950 px-3 py-1 rounded-lg text-[10px] text-white transition-all ease-linear hover:bg-purple-800 hover:cursor-pointer hover:shadow-2xl hover:shadow-purple-950 active:bg-purple-600 active:scale-110' onClick={() => addTopic()}>
                            +
                        </button>

                    </div>

                    {Array.from({length: topicValues.length}).map((_, i) =>
                        <div key={i} className='flex items-stretch justify-between gap-3 mb-3'>
                            <input required type="text" name="topic" value={topicValues[i]} onChange={(e) => updateTopicValues(i, e.target.value)}  className='bg-purple-200 px-3 py-2 rounded-md flex-6'/>
                            <button disabled={topicValues.length <= 1} type='button' className='bg-red-400 disabled:bg-gray-200 px-3 py-2 rounded-md flex-1 text-sm h-auto transition-all ease-linear duration-150 hover:bg-red-300 disabled:hover:cursor-not-allowed  disabled:hover:bg-gray-200 disabled:active:bg-gray-200  hover:cursor-pointer active:bg-red-100 active:scale-95 disabled:hover:scale-100 ' onClick={() => deleteTopic(i)}>Delete</button>
                        </div>
                    )}
                </div>

                <button type='submit'  className='w-full mb-5 bg-purple-900 px-3 py-3 rounded-lg text-white font-bold transition-all ease-linear hover:bg-purple-800 hover:cursor-pointer hover:shadow-2xl active:bg-purple-600 active:scale-[1.02]'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default page