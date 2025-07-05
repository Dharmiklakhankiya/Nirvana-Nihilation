import React from 'react'

function AboutPreview({resumeInfo}) {
  if (!resumeInfo?.summery) {
    return null;
  }
  
  return (
    <div className='my-2'>
      <h2 className='text-center font-bold text-sm mb-1'
      style={{color:resumeInfo?.themeColor}}
      >About</h2>
      <hr style={{borderColor:resumeInfo?.themeColor}} />
      <p className='mt-2 text-xs'>{resumeInfo?.summery}</p>
    </div>
  )
}

export default AboutPreview
