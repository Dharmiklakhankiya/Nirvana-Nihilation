import React from 'react'

function HeaderPreview({resumeInfo}) {
  return (
    <div>
        <h1 className='text-center text-xl'
        style={{color:resumeInfo?.themeColor}}
        >{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
        <h2 className='text-center text-sm'>{resumeInfo?.jobTitle}</h2>

        <div className='flex justify-evenly items-center mt-2 text-[10px]'>
            <h2>{resumeInfo?.address}</h2>
            <h2>{resumeInfo?.phone}</h2>
            <h2>{resumeInfo?.email}</h2>
        </div>
        <hr className='my-2' />
    </div>
  )
}

export default HeaderPreview
