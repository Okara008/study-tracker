import React from 'react'

function ProgressBar({ percentage = 0 }) {
    const safePercentage = Math.min(Math.max(percentage, 0), 100)

    return (
        <div className='w-full'>
            <div className='mb-2 flex items-center justify-between text-sm font-medium text-slate-700'>
                <span>Progress</span>
                <span>{safePercentage.toFixed(1)}%</span>
            </div>

            <div className='h-2 w-full overflow-hidden rounded-full bg-slate-200'>
                <div
                    className='h-full rounded-full bg-violet-600 transition-all duration-300' 
                    style={{ width: `${safePercentage}%`, backgroundColor: (percentage == 100 ? 
                                                                                "#16A34A" : 
                                                                                percentage > 70 ? 
                                                                                    "#2563EB" : 
                                                                                    percentage > 29 ? 
                                                                                        "#7C3AED" : 
                                                                                        "#E11D48"
                                                                            ) }}
                />
            </div>
        </div>
    )
}

export default ProgressBar