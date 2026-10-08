import React from 'react'
import Link from "next/link"
function header() {
    return (
        <div className='w-full bg-purple-900 p-3 mb-4 flex items-center justify-between fixed'>
            <Link href='/' className='font-black text-2xl text-white hover:text-purple-200 ease-linear duration-150 cursor-pointer active:text-purple-400'><h1>Study Tracker</h1></Link>

            <Link href='/courselist'><button className='bg-purple-500 py-1.5 px-4 text-white rounded-2xl shadow-xl hover:bg-purple-300 hover:text-black ease-linear duration-150 cursor-pointer active:bg-purple-100'>All Courses</button></Link>
        </div>
    )
}

export default header